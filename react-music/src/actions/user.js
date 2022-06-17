import axios from "axios";
import {getUser , setUser} from "../reduces/userReducer"
export const registration=async (email,password)=>{
    try {
        const response = await axios.post(`http://localhost:27017/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    }
    catch (e){
        alert(e.response.data.message)
    }
}
export const login = (email,password)=>{
    return async dispatch=>{
        try {
            const response = await axios.post(`http://localhost:27017/api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token',response.data.token)
        }
        catch (e){
            alert(e.response.data.message)
        }
    }
}

export const auth =  (user) => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:27017/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token')
        }
    }
}

export const edit = (email) => {
    {
        return async dispatch => {
            try {
                const response = await axios.patch ( `http://localhost:27017/api/auth/edit-user` , {email} ,
                    {headers: {Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }`}}
                )
                alert ( response.data.message )
                dispatch ( setUser ( response.data ) )
            } catch (e) {
                alert ( e.response.data.message )
            }
        }
    }
}

export const getUsers = () => {
    {
        return async dispatch => {
            try {
                const response=await axios.get ( `http://localhost:27017/api/auth/get-users` , {headers: {Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }`}} )
                dispatch(getUser(response.data))
            } catch (e) {
                console.log ( e )
            }
        }
    }
}



