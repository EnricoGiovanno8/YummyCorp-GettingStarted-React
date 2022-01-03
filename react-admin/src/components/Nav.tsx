/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Nav = () => {
    const [user, setUser] = useState(new User())

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('user')
                
                setUser(new User(
                    data.id,
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.role
                ))
            }
        )()
    }, [])

    const logout = async () => {
        await axios.post('logout', {})
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
            
            <div className="navbar-nav" style={{ flexDirection: 'row' }}>
                <Link to='/profile' className="nav-link px-3">{user.name}</Link>
                <Link to='login' className="nav-link px-3" onClick={logout}>Sign out</Link>
            </div>
        </nav>
    )
}

export default Nav;