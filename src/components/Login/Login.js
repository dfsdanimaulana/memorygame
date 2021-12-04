import { useState } from 'react'
import axios from 'axios'

import './Login.css'

const twiceName = [
    'mina',
    'sana',
    'jihyo',
    'momo',
    'tzuyu',
    'dahyun',
    'nayeon',
    'jeongyeon',
    'chaeyoung',
    'twice',
    'once',
    'teudoongie',
]

export default function Login({ url, updateUser }) {
    const [data, setData] = useState({
        username: '',
        password: '',
        check_password: '',
    })
    const [register, setRegister] = useState(false)

    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setError(false)
        const { id, value } = e.target
        setData((prevState) => ({
            ...prevState,
            [id]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (twiceName.includes(data.username)) {
            setError("please don't use twice name 😊")
            return
        }
        if (register) {
            if (data.password !== data.check_password) {
                setError('wrong check password')
                return
            }
        }
        setIsPending(true)

        const targetUrl = register ? `${url}/user` : `${url}/user/login`

        try {
            const res = await axios.post(targetUrl, data)
            setIsPending(false)
            updateUser(res.data)
            setRegister(false)
        } catch (error) {
            console.log(error)
            setIsPending(false)
            setError(error?.response?.data?.message)
        }
    }

    return (
        <div id="form-container">
            {register ? <h3>Register</h3> : <h3>Log in</h3>}
            {isPending && <p className="form-error">Loading...</p>}
            {error && <p className="form-error">{error}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    id="username"
                    className="login-input"
                    type="text"
                    onChange={handleChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="username"
                    required
                />
                <input
                    id="password"
                    className="login-input"
                    type="password"
                    onChange={handleChange}
                    placeholder="password"
                    required
                />

                {register && (
                    <input
                        id="check_password"
                        className="login-input"
                        onChange={handleChange}
                        type="password"
                        placeholder="check password"
                        required
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
