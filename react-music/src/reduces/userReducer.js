const SET_USER="SET_USER"
const LOG_OUT="LOG_OUT"
const GET_USERS="GET_USERS"
const IS_ADMIN="IS_ADMIN"
const defaultState = {
    currentUser:{},
    users:[],
    isAuth:false,
    roles:[],
    isAdmin:false,
}
export  default  function userReducer(state=defaultState,action){
    switch (action.type){
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                isAdmin :false
            }
        case GET_USERS:
            return {
                ...state,
                currentUser: action.payload,
                users:[...state.users, action.payload],
                isAuth : true,

            }
        case LOG_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false,
                isAdmin : false
            }


        default:
            return state
    }
}



export const getUser=users=>({
    type:GET_USERS,payload : users
})
export const setUser= user=>({
    type: SET_USER,payload: user
})
export const logOut = ()=>({
    type:LOG_OUT
})

