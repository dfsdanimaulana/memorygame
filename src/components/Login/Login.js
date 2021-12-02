import { useState } from 'react'
import axios from 'axios'

import './Login.css'

export default function Login({ url, updateUser }) {
    const [data, setData] = useState({
        username: '',
        password: '',
        check_password: '',
    })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [register, setRegister] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const newData = { ...data }
        const newValue = e.target.id
        setData({ ...newData, [newValue]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        // const data = { username, password, checkPassword }

        // const targetUrl = register ? `${url}/user` : `${url}/user/login`

        // try {
        //     const res = await axios.post(targetUrl, data)
        //     updateUser(res.data)
        //     setRegister(false)
        // } catch (error) {
        //     setError(error?.response?.data?.message)
        // }
    }

    return (
        <div id="form-container">
            {register ? <h3>Register</h3> : <h3>Log in</h3>}
            {error && <p className="form-error">{error}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    className="login-input"
                    type="text"
                    onChange={handleChange}
                    value={data.username}
                    autoComplete="false"
                    autoFocus="true"
                    placeholder="username"
                />
                <input
                    className="login-input"
                    type="password"
                    onChange={handleChange}
                    value={data.password}
                    placeholder="password"
                />

                {register && (
                    <input
                        className="login-input"
                        onChange={handleChange}
                        type="password"
                        value={data.check_password}
                        placeholder="check password"
                    />
                )}
                <button className="log login-button" type="submit">
                    Submit
                </button>
                {register ? (
                    <div className="other">
                        have account ? login
                        <span onClick={() => setRegister(false)}> here</span>
                    </div>
                ) : (
                    <div className="other">
                        new user ? create account
                        <span onClick={() => setRegister(true)}> here</span>
                    </div>
                )}
            </form>
        </div>
    )
}
