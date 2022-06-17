import React, {useState} from 'react';
import "./Edit-user.scss"
import Input from "../../utils/input/Input";
import {edit} from "../../actions/user";
import {useDispatch, useSelector} from "react-redux";

const Edit = () => {
    const dispatch=useDispatch();
    const currentUser = useSelector(state => state.user.currentUser)
    const [email,setEmail]=useState(currentUser.email)

    function changeHandler(email){
        dispatch(edit(email))
    }
    return (
        <div className="div-edit-user">
            <div className="headerLeft">
                <img width={100}  height={60} src="img/musiclab_logo.jpg"/>
            </div>
            <Input type="text" value={email} setValue={setEmail}  />
            <button className="edit-button" onClick={()=>changeHandler(email)}>Change e-mail</button>

        </div>
    );
};

export default Edit;