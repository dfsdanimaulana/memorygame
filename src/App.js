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
    const [timer, setTimer] = useState(0)
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [trigger, setTrigger] = useState({})
    const [disabled, setDisabled] = useState(false)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [gamePoint, setGamePoint] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    
    const intervalTimer = useRef(null)

    // fetch user data
    const {
        data: user,
        isPending,
        error,
    } = useFetch(`${BASE_URL}/user`, trigger)

    // start game automaticly
    useEffect(() => shuffleCards(), [])

    // compare two cards
    useEffect(() => {
        // game finished if all matched
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

    // reset choices and increase turn
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns((prevTurn) => prevTurn + 1)
        setDisabled(false)
    }

    // update user point
    const updateUserPoint = () => {
        // calculate the point
        const point = 100 - turns - timer
        setGamePoint(`+ ${point}`)

        const data = {
            username: user[0].username,
            newPoint: point,
        }
        
        try {
            setTimeout(async () => {
                const res = await axios.post(`${BASE_URL}/user/point`, data)
                setGamePoint('')
                setTrigger(res)
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='App'>
        <div className='log-user'>
        {isLogged ?
            <div className='log'>Log out</div> :
            <div className='log'>Log in</div> 
        }
        </div>
            <h1>Twice Memory Game</h1>
            {/* <button onClick={updateUserPoint}>Update point</button> */}
            <div className='progress'>
            
            {user &&
                <Profile user={user} gamePoint={gamePoint} />
            }
                <div className='count'>
                    <div className='turn'>Turns: {turns}</div>
                    <div className='timer'>Time: {timer}s</div>
                </div>
            </div>
            <button onClick={shuffleCards}>new game</button>
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
                    Contact me
                    <a href='https://Instagram.com/dnm17_'>@dnm17_</a>
                </p>
            </footer>
        </div>
    )
}

export default App
