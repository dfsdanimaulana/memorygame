import './App.css'

import { useState } from 'react'

const cardImages = [
    { src: '/img/helmet-1.png' },
    { src: '/img/potion-1.png' },
    { src: '/img/ring-1.png' },
    { src: '/img/scroll-1.png' },
    { src: '/img/shield-1.png' },
    { src: '/img/sword-1.png' },
]

function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)

    // shuffle card
    const shuffleCards = () => {
        const shuffeledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        setCards(shuffeledCards)
        setTurns(0)
    }

    return (
        <div className='App'>
            <h1>Memory Game</h1>
            <button onClick={shuffleCards}>new game</button>
        </div>
    )
}

export default App
