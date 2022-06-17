import React , {useEffect , useState} from 'react';
import './navbar.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import userReducer , {isAdmin , logOut} from "../../reduces/userReducer";
import {auth} from "../../actions/user";

const NavBar =() => {

    const isAuth = useSelector ( state => state.user.isAuth )
    let isAdm = useSelector ( state => state.user.isAdmin )
    const dispatch = useDispatch ()
    const roles = useSelector ( state => state.user.currentUser.roles)
    isAdm=roles?.includes("ADMIN")




    return (
        <div className="navbar">
            <div className="container">
                { !isAuth && <button className="login"><NavLink to="/login"> Login </NavLink></button> }
                { !isAuth && <button className="registration pl-10"><NavLink to="/registration">Registration </NavLink>
                </button> }
                { isAuth && <button className="edit-user"><NavLink to="/edit-user">Edit User </NavLink></button> }
                { isAuth && <button className="logout pl-10" onClick={ () => dispatch ( logOut () ) }>Logout</button> }
                { isAdm && isAuth && <button className="admin pl-10"><NavLink to="/adminPanel">Admin Panel </NavLink></button> }

            </div>
        </div>


    );
}

export default NavBar