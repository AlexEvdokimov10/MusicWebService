import React , {useContext , useEffect , useState} from 'react';
import {getUsers} from "../../actions/user";
import {useDispatch , useSelector} from "react-redux";
import "./AdminPanel.scss"





const AdminPanel = () => {

    const dispatch=useDispatch()


    let users = useSelector ( state =>
        state.user.users
    )
    console.log(users)
    if(users.length===0){
        dispatch(getUsers())
    }

    let listUsers=users.map(array=>
        array.map(item=>
            <li className="info mt-30"> UserEmail :
                {item.email} ;
                Amount of music: {item.musicAmount};
                Role : {item.roles}
            </li>))
    return (
        <div className="mt-40">
            <h3>List of users</h3>
            {listUsers}
        </div>

    );
};

export default AdminPanel;