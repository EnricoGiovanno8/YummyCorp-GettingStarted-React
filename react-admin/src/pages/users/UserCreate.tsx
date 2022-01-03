import axios from "axios"
import React, { SyntheticEvent, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Wrapper from "../../components/Wrapper"
import { Role } from "../../models/role"

const UserCreate = () => {
    const [roles, setRoles] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [roleId, setRoleId] = useState(1)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('roles')

                setRoles(data)
            }
        )()
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const sendData = {
            first_name: firstName,
            last_name: lastName,
            email,
            role_id: roleId
        }

        await axios.post('users', sendData)

        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to='/users' />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select className="form-select" onChange={(e) => setRoleId(+e.target.value)} >
                        {roles.map((role: Role) => {
                           return <option key={role.id} value={role.id}>{role.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <button type="submit" className="btn btn-success">Add User</button>
                </div>
            </form>
        </Wrapper>
    )
}

export default UserCreate