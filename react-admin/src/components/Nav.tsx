/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import { connect } from "react-redux";

const Nav = (props: {user: User}) => {
    const logout = async () => {
        await axios.post('logout', {})
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
            
            <div className="navbar-nav" style={{ flexDirection: 'row' }}>
                <Link to='/profile' className="nav-link px-3">{props.user.name}</Link>
                <Link to='/login' className="nav-link px-3" onClick={logout}>Sign out</Link>
            </div>
        </nav>
    )
}

const mapStateToProps = (state: {user: User}) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Nav);