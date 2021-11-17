import './App.css'

import { useEffect, useState } from 'react'
import SingleCards from './components/SingleCards'

const cardImages = [
    { src: '/img/helmet-1.png', matched: false },
    { src: '/img/potion-1.png', matched: false },
    { src: '/img/ring-1.png', matched: false },
    { src: '/img/scroll-1.png', matched: false },
    { src: '/img/shield-1.png', matched: false },
    { src: '/img/sword-1.png', matched: false },
]

function App() {
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
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffeledCards)
        setTurns(0)
    }

    // handle user choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare two cards
    useEffect(() => {
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
            <h1>Memory Game</h1>
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
            <p>Turns : {turns}</p>
        </div>
    )
}

export default App
