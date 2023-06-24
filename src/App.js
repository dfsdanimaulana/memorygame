import './App.css'

import { useEffect, useState, useRef } from 'react'
import SingleCards from './components/SingleCards/SingleCards'
import Level from './components/Level/Level'
import Profile from './components/Profile/Profile'
import { useFetch } from './hooks/useFetch'
import axios from 'axios'
import Modal from './components/Modal/Modal'
import Login from './components/Login/Login'
import ScoreBoard from './components/ScoreBoard/ScoreBoard'

const cardImages = [
    { src: process.env.PUBLIC_URL + '/img/chaeyoung.jpeg', matched: false },
    { src: process.env.PUBLIC_URL + '/img/dahyun.jpeg', matched: false },
    { src: process.env.PUBLIC_URL + '/img/jeongyon.jpeg', matched: false },
    { src: process.env.PUBLIC_URL + '/img/jihyo.jpeg', matched: false },
    { src: process.env.PUBLIC_URL + '/img/mina.jpeg', matched: false },
    { src: process.env.PUBLIC_URL + '/img/momo.jpeg', matched: false },
    { src: process.env.PUBLIC_URL + '/img/nayeon.jpeg', matched: false },
    { src: process.env.PUBLIC_URL + '/img/sana.jpeg', matched: false },
    { src: process.env.PUBLIC_URL + '/img/tzuyu.jpeg', matched: false },
]

const BASE_URL =
    'https://memorygame-server-olec-b6zp3fitl-dfsdanimaulana.vercel.app/'

function App() {
    const [timer, setTimer] = useState(60)
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [trigger, setTrigger] = useState({})
    const [disabled, setDisabled] = useState(false)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [gamePoint, setGamePoint] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    const [timeOut, setTimeOut] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState(null)
    const [gameDone, setGameDone] = useState(false)
    const [showBoard, setShowBoard] = useState(false)

    const intervalTimer = useRef(null)

    // fetch user data
    const { data: users } = useFetch(`${BASE_URL}/user/point`, trigger)
    const { data: topTime } = useFetch(`${BASE_URL}/user/time`, trigger)
    const { data: topTurn } = useFetch(`${BASE_URL}/user/turn`, trigger)

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
            setGameDone(true)
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

    // time out handler
    useEffect(() => {
        if (timer < 1) {
            timeStop()
            setTimeOut(true)
            setDisabled(true)
        }
    }, [timer])

    // shuffle cards
    const shuffleCards = () => {
        const shuffeledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        setDisabled(false)
        setGameDone(false)
        timeStop()
        setTimer(60)
        setTimeOut(false)
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffeledCards)
        setTurns(0)
    }

    // handle user choice
    const handleChoice = (card) => {
        // start timer
        if (timer === 60) {
            timeStart()
        }
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // start time counter
    const timeStart = () => {
        if (intervalTimer.current) clearInterval(intervalTimer.current)
        intervalTimer.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1)
        }, 1000)
    }

    // stop time counter
    const timeStop = () => {
        clearInterval(intervalTimer.current)
    }

    // reset choices and increase turn
    const resetTurn = () => {
        setDisabled(false)
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns((prevTurn) => prevTurn + 1)
    }

    // update user point
    const updateUserPoint = () => {
        // calculate the point
        const point = 100 - turns - timer
        setGamePoint(`+ ${point}`)

        const data = {
            username: user?.username,
            newPoint: point,
            time: 60 - timer,
            turn: turns,
        }

        try {
            setTimeout(async () => {
                const res = await axios.post(`${BASE_URL}/user/point`, data)
                setGamePoint('')
                setTrigger(res)
                setUser((prevUser) => {
                    const newUser = { ...prevUser }
                    return { ...newUser, point: prevUser.point + point }
                })
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    // hanle log user
    const handleLogged = () => {
        if (isLogged) {
            // if logged in show logout modal
            setShowModal(true)
        } else {
            // if not logged in show login modal
            setShowModal(true)
        }
    }

    // function to close modal
    const handleModal = () => {
        if (showBoard) {
            setShowBoard(false)
        } else {
            setShowModal(!showModal)
        }
    }

    // set logged user
    const updateUser = (data) => {
        setUser(data)
        setIsLogged(true)
        handleModal()
    }

    // handle log out user
    const handleLogOut = () => {
        setUser(null)
        setIsLogged(false)
        handleModal()
        shuffleCards()
    }

    // open board
    const handleBoard = () => {
        setShowBoard(true)
    }

    return (
        <div className="App">
            {showModal && (
                <Modal handleModal={handleModal}>
                    {isLogged ? (
                        <>
                            <div>are you sure?</div>
                            <button
                                onClick={handleLogOut}
                                className="log login-button">
                                log out
                            </button>
                        </>
                    ) : (
                        <Login url={BASE_URL} updateUser={updateUser} />
                    )}
                </Modal>
            )}
            {showBoard && (
                <Modal handleModal={handleModal}>
                    <ScoreBoard
                        users={users}
                        topTime={topTime}
                        topTurn={topTurn}
                    />
                </Modal>
            )}
            <div className="board-button">
                <button className="log" onClick={handleBoard}>
                    Scoreboard
                </button>
            </div>
            <div className="log-user">
                {isLogged ? (
                    <button className="log" onClick={handleLogged}>
                        Log out
                    </button>
                ) : (
                    <button className="log" onClick={handleLogged}>
                        Log in
                    </button>
                )}
            </div>
            <h1>Twice Memory Game</h1>
            {!isLogged && <h5>Log in to save your game progress</h5>}
            {isLogged && (
                <div className="progress">
                    {user && <Profile user={user} gamePoint={gamePoint} />}
                    <div className="count">
                        <div>Turns: {turns}</div>
                        {timeOut ? (
                            <div>Time Out!</div>
                        ) : (
                            <div>Timer: {timer}s</div>
                        )}
                    </div>
                </div>
            )}

            <button onClick={shuffleCards} className="main-button">
                new game
            </button>
            {gameDone && (
                <p>{`game finish with ${turns} turns in ${
                    60 - timer
                } second`}</p>
            )}

            <div className="card-grid">
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
                    <a href="https://Instagram.com/dnm17_">@dnm17_</a>
                </p>
            </footer>
        </div>
    )
}

export default App
