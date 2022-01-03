import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";

const Roles = () => {
    const [roles, setRoles] = useState([])

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('roles')

                setRoles(data)
            }
        )()
    }, [])

    const del = async(id: number) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            await axios.delete(`roles/${id}`)

            const { data } = await axios.get('roles')

            setRoles(data)
        }
    }

    return (
        <Wrapper>
            <div className="add-role">
                <Link to="/roles/create">
                    <button type="button" className="btn btn-success">Add</button>
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role: Role) => {
                    return (
                        <tr key={role.id}>
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                        <td>
                            <Link to={`/roles/${role.id}`}><button type="button" className="btn btn-warning">Edit</button></Link>
                            <button type="button" className="btn btn-danger" onClick={() => del(role.id)}>Delete</button>
                        </td>
                        </tr>
                    )
                    })}
                </tbody>
                </table>
            </div>
        </Wrapper>
    )
}

export default Roles