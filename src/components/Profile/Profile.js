import { useFetch } from '../../hooks/useFetch'

import './Profile.css'

export default function Profile() {
    const { data: user } = useFetch(
        'https://twice-memory-server.herokuapp.com/user',
    )
    console.log(user)

    return (
        <div id='profile-card'>
            {user && (
                <>
                    <img src={`/avatar/${user[0].avatar}`} alt='avatar' />
                    <div className='username'>
                        <div>{user[0].username}</div>
                        <div className='level'>1</div>
                    </div>
                    <div className='point'>
                        <input
                            type='range'
                            name='point'
                            id='point'
                            max='100'
                            defaultValue={user[0].point}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
