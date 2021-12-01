import './Profile.css'

export default function Profile({ user, gamePoint }) {
    return (
        <div id="profile-card">
            <img src={`/avatar/${user?.avatar}`} alt="avatar" />
            <div className="username">
                <div>{user?.username}</div>
                <div className="level">1</div>
            </div>
            <div className="point">
                <label>
                    point :
                    <span>
                        {user?.point} {gamePoint}
                    </span>
                </label>
                <input
                    type="range"
                    name="point"
                    id="point"
                    max="10000"
                    disabled
                    defaultValue={user?.point}
                />
            </div>
        </div>
    )
}
