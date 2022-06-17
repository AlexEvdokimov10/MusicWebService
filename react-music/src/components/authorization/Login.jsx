import React, {useState} from 'react';
import './authorization.scss'
import Input from "../../utils/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";


const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()

    return (
        <div className="authorization">
            <img width={100}  height={60} src="img/musiclab_logo.jpg"/>
            <div className="auth-header">Authorization</div>
            <Input value={email} setValue={setEmail} type="email" placeholder="Input email..." />
            <Input value={password} setValue={setPassword} type="password" placeholder="Input password..."/>
            <button className="auth-button" onClick={() => dispatch(login(email,password))}>Enter</button>
        </div>
    );
};

export default Login;