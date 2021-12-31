/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";

const Nav = () => {
    const [user, setUser] = useState({
        first_name: ''
    })

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('user')
                
                setUser(data)
            }
        )()
    }, [])

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
            
            <div className="navbar-nav" style={{ flexDirection: 'row' }}>
                <a className="nav-link px-3" href="#">{user.first_name}</a>
                <a className="nav-link px-3" href="#">Sign out</a>
            </div>
        </nav>
    )
}

export default Nav;