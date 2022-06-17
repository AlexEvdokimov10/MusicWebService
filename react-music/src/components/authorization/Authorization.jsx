import React, {useState} from 'react';
import './authorization.scss'
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";
import Body from "../body/Body";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const Authorization = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    return (
        <div className="authorization">
            <img width={100}  height={60} src="img/musiclab_logo.jpg"/>
            <div className="auth-header">Registration</div>
            <Input value={email} setValue={setEmail} type="email" placeholder="Input email..." />
            <Input value={password} setValue={setPassword} type="password" placeholder="Input password..."/>
            <button className="auth-button" onClick={()=>registration(email,password)}>Register</button>
            <span className="continue"> <NavLink to="../body" > Lets listen music </NavLink> </span>
        </div>
    );
};

export default Authorization;