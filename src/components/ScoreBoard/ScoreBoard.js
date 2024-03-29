import { useState } from 'react'

import './ScoreBoard.css'

export default function ScoreBoard({ users, topTurn, topTime }) {
    const [point, setPoint] = useState(true)
    const [time, setTime] = useState(false)
    const [turn, setTurn] = useState(false)

    return (
        <div id="board-container">
            <div className="button-group">
                <button
                    onClick={() => {
                        setPoint(true)
                        setTime(false)
                        setTurn(false)
                    }}>
                    Top Player
                </button>
                <button
                    onClick={() => {
                        setPoint(false)
                        setTime(true)
                        setTurn(false)
                    }}>
                    Time Records
                </button>
                <button
                    onClick={() => {
                        setPoint(false)
                        setTime(false)
                        setTurn(true)
                    }}>
                    Turn Records
                </button>
            </div>

            {point && (
                <div className="board-list">
                    <ul>
                        {users &&
                            users.map((user, index) => (
                                <li className="data-list" key={user._id}>
                                    <span> {index + 1} </span>
                                    <span> {user.username} </span>
                                    <span> {user.point} pts </span>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
            {time && (
                <div className="board-list">
                    <ul>
                        {topTime &&
                            topTime.map((user, index) => (
                                <li className="data-list" key={user._id}>
                                    <span> {index + 1} </span>
                                    <span> {user.username} </span>
                                    <span> {user.time}s </span>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
            {turn && (
                <div className="board-list">
                    <ul>
                        {topTurn &&
                            topTurn.map((user, index) => (
                                <li className="data-list" key={user._id}>
                                    <span> {index + 1} </span>
                                    <span> {user.username} </span>
                                    <span> {user.turn} turns </span>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
