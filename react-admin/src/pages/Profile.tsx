import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";

const Profile = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('user')

                setFirstName(data.first_name)
                setLastName(data.last_name)
                setEmail(data.email)
                setPassword(data.password)
                setPasswordConfirm(data.password_confirm)
            }
        )()
    }, [])

    const submitProfile = async (e: SyntheticEvent) => {
        e.preventDefault()

        const sendData = {
            first_name: firstName,
            last_name: lastName,
            email
        }

        await axios.put('users/info', sendData)
    }

    const submitPassword = async (e: SyntheticEvent) => {
        e.preventDefault()

        const sendData = {
            password,
            password_confirm: passwordConfirm
        }

        await axios.put('users/password', sendData)
    }

    return (
        <Wrapper>
            <h3>Account Information</h3>
            <form onSubmit={submitProfile}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        defaultValue={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        defaultValue={lastName}
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input 
                        className="form-control" 
                        type="email" 
                        defaultValue={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-outline-secondary">Save</button>
            </form>

            <h3 className="mt-4">Change Password</h3>
            <form onSubmit={submitPassword}>
                <div className="mb-3">
                    <label>Password</label>
                    <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Password Confirm</label>
                    <input className="form-control" type="password" onChange={(e) => setPasswordConfirm(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    )
}

export default Profile