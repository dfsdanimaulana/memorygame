export default function TopPayer({ users, topTurn, topTime }) {
    return (
        <div id="top-player-container">
            <ul>
                {users &&
                    users.map((user, index) => (
                        <li key={user._id}>
                            <span>
                                {index + 1} | {user.username} | {user.point}
                            </span>
                        </li>
                    ))}
            </ul>
            <ul>
                {topTime &&
                    topTime.map((user, index) => (
                        <li key={user._id}>
                            <span>
                                {index + 1} | {user.username} | {user.time}
                            </span>
                        </li>
                    ))}
            </ul>
            <ul>
                {topTurn &&
                    topTurn.map((user, index) => (
                        <li key={user._id}>
                            <span>
                                {index + 1} | {user.username} | {user.turn}
                            </span>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
