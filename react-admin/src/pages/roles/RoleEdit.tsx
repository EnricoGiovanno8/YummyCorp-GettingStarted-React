import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Permission } from "../../models/permissions";

const RoleEdit = () => {
    const [roleName, setRoleName] = useState('')
    const [permissions, setPermissions] = useState([])
    const [selected, setSelected] = useState([] as number[])
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('permissions')

                setPermissions(response.data)

                const { data } = await axios.get(`roles/${+window.location.pathname.substring(7)}`)

                setRoleName(data.name)
                setSelected(data.permissions.map((p: Permission) => p.id))
            }
        )()
    }, [])

    const check = (id: number) => {
        if(selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id))
            return
        }

        setSelected([...selected, id])
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const sendData = {
            name: roleName,
            permissions: selected
        }

        await axios.put(`roles/${+window.location.pathname.substring(7)}`, sendData)

        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to='/roles' />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3 row">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" defaultValue={roleName} placeholder="Role Name" onChange={(e) => setRoleName(e.target.value)} />
                </div>
                <div className="mb-3 row">
                    <label className="form-label">Permissions</label>
                    {permissions.map((permission: Permission) => {
                        return (
                            <div className="form-check" key={permission.id}>
                                <input className="form-check-input" type="checkbox" checked={selected.some(s => s === permission.id)} value={permission.id} id="flexCheckDefault" onChange={(e) => check(permission.id)} />
                                <label className="form-check-label">
                                    {permission.name}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <button type="submit" className="btn btn-success">Save</button>
                </div>
            </form>
        </Wrapper>
    )
}

export default RoleEdit