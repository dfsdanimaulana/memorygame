import { useState } from 'react'
import axios from 'axios'

export default function Login({ url, updateUser }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [register, setRegister] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { username, password, checkPassword }

        const targetUrl = register ? `${url}/user` : `${url}/user/login`

        try {
            const res = await axios.post(targetUrl, data)
            updateUser(res.data)
            setRegister(false)
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                className="login-input"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <input
                className="login-input"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            {register && (
                <input
                    className="login-input"
                    type="password"
                    onChange={(e) => setCheckPassword(e.target.value)}
                    value={password}
                />
            )}
            <button type="submit">Submit</button>
            {register ? (
                <div>
                    have account ? login
                    <span onClick={() => setRegister(false)}> here</span>
                </div>
            ) : (
                <div>
                    new user ? create account
                    <span onClick={() => setRegister(true)}> here</span>
                </div>
            )}
        </form>
    )
}
