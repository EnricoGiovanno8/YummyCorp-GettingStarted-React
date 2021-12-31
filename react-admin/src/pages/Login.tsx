import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import '../Login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        let data = {
            email,
            password
        }

        await axios.post('login', data)

        setRedirect(true)
    }

    if(redirect) {
        return <Navigate to='/' />
    }

    return (
        <main className="form-signin">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </main>
    )
}

export default Login