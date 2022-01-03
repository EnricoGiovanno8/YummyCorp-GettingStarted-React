import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Permission } from "../../models/permissions";

const RoleCreate = () => {
    const [roleName, setRoleName] = useState('')
    const [permissions, setPermissions] = useState([])
    const [selected, setSelected] = useState([] as number[])
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('permissions')

                setPermissions(data)
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

        await axios.post('roles', sendData)

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
                    <input type="text" className="form-control" placeholder="Role Name" onChange={(e) => setRoleName(e.target.value)} />
                </div>
                <div className="mb-3 row">
                    <label className="form-label">Permissions</label>
                    {permissions.map((permission: Permission) => {
                        return (
                            <div className="form-check" key={permission.id}>
                                <input className="form-check-input" type="checkbox" value={permission.id} id="flexCheckDefault" onChange={(e) => check(permission.id)} />
                                <label className="form-check-label">
                                    {permission.name}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <button type="submit" className="btn btn-success">Add Role</button>
                </div>
            </form>
        </Wrapper>
    )
}

export default RoleCreate