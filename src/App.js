import './App.css'

import { useEffect, useState, useRef } from 'react'
import SingleCards from './components/SingleCards/SingleCards'
import Level from './components/Level/Level'

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

function App() {
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
        //  cek if all matched
        if (cards.filter((card) => card.matched === false).length === 0) {
            // stop count here
            timeStop()
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

    return (
        <div className='App'>
            <h1>Twice Memory Game</h1>
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
        </div>
    )
}

export default App
