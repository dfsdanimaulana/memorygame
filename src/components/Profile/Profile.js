import './Profile.css'

export default function Profile({ user, gamePoint }) {
    return (
        <div id='profile-card'>
            <img src={`/avatar/${user[0]?.avatar}`} alt='avatar' />
            <div className='username'>
                <div>{user[0]?.username}</div>
                <div className='level'>1</div>
            </div>
            <div className='point'>
                <label>
                    point : <span>{user[0].point} {gamePoint}</span>
                </label>
                <input
                    type='range'
                    name='point'
                    id='point'
                    max='100'
                    defaultValue={user[0]?.point}
                />
            </div>
        </div>
    )
}
