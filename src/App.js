import './App.css'

import { useEffect, useState, useRef } from 'react'
import SingleCards from './components/SingleCards/SingleCards'
import Level from './components/Level/Level'
import Profile from './components/Profile/Profile'
import { useFetch } from './hooks/useFetch'
import axios from 'axios'

const cardImages = [
    { src: '/img/chaeyoung.jpeg', matched: false },
    { src: '/img/dahyun.jpeg', matched: false },
    { src: '/img/jeongyon.jpeg', matched: false },
    { src: '/img/jihyo.jpeg', matched: false },
    { src: '/img/mina.jpeg', matched: false },
    { src: '/img/momo.jpeg', matched: false },
    { src: '/img/nayeon.jpeg', matched: false },
    { src: '/img/sana.jpeg', matched: false },
    { src: '/img/tzuyu.jpeg', matched: false },
]

// const BASE_URL = 'https://twice-memory-server.herokuapp.com'
const BASE_URL = 'http://localhost:3003'

function App() {
    const [url, setUrl] = useState(`${BASE_URL}/user`)
    // fetch user data
    const { data: user, isPending, error } = useFetch(url)
    const intervalTimer = useRef(null)
    const [timer, setTimer] = useState(0)
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    // shuffle cards
    const shuffleCards = () => {
        const shuffeledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        timeStop()
        setTimer(0)
        setTurns(0)
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffeledCards)
    }

    // handle user choice
    const handleChoice = (card) => {
        // start timer
        if (timer === 0) {
            timeStart()
        }
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // start time counter
    const timeStart = () => {
        if (intervalTimer.current) clearInterval(intervalTimer.current)
        intervalTimer.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1)
        }, 1000)
    }

    // stop time counter
    const timeStop = () => {
        clearInterval(intervalTimer.current)
    }

    // compare two cards
    useEffect(() => {
        // cek if all matched
        // game finished

        if (
            cards.length !== 0 &&
            cards.filter((card) => card.matched === false).length < 1
        ) {
            // stop count here
            timeStop()
            updateUserPoint()
        }

        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    // reset choices and increase turn
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns((prevTurn) => prevTurn + 1)
        setDisabled(false)
    }

    // start game automaticly
    useEffect(() => shuffleCards(), [])

    // update user point
    const updateUserPoint = async () => {
        if (!user) {
            console.log('user not found')
            return
        }
        const point = 100 - turns - timer
        const data = {
            username: user[0].username,
            newPoint: point,
        }
        try {
            const res = await axios.post(`${BASE_URL}/user/point`, data)
            console.log(res)
            setUrl(`${BASE_URL}/user`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='App'>
            <h1>Twice Memory Game</h1>
            {isPending ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>No user</h2>
            ) : (
                <Profile user={user} />
            )}
            <button onClick={updateUserPoint}>Update point</button>
            <button onClick={shuffleCards}>new game</button>
            <div className='progress'>
                <h5>Turns: {turns}</h5>
                <h5>Time: {timer}s</h5>
            </div>
            <div className='card-grid'>
                {cards.map((card) => (
                    <SingleCards
                        card={card}
                        key={card.id}
                        handleChoice={handleChoice}
                        flipped={
                            card === choiceOne ||
                            card === choiceTwo ||
                            card.matched
                        }
                        disabled={disabled}
                    />
                ))}
            </div>
            <Level />
            <footer>
                <p>Copyright © 2021</p>
                <p>
                    Contact me{' '}
                    <a href='https://Instagram.com/dnm17_'>@dnm17_</a>
                </p>
            </footer>
        </div>
    )
}

export default App
