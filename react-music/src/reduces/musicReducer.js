import music from "../components/disk/musicList/music/Music";
import {getAthours} from "../actions/music";

const SET_MUSICS="SET_MUSICS"
const SET_CURRENT_DIR="SET_CURRENT_DIR"
const ADD_MUSIC = "ADD_MUSIC"
const DELETE_MUSIC="DELETE_MUSIC"
const GET_AUTH="GET_AUTH"
const defaultState =
    {
        musics:[],
        currentDir:null,
        path:"",
        author:null,
    }
    export  default  function musicReducer(state=defaultState, action){
    switch (action.type){
        case SET_MUSICS:return {...state,musics: action.payload }
        case SET_CURRENT_DIR:return {...state, currentDir: action.payload}
        case ADD_MUSIC: return {...state, musics: [...state.musics, action.payload]}
        case DELETE_MUSIC:return {...state, musics: [...state.musics.filter(music=>music._id!=action.payload)]}
        case GET_AUTH:return {...state,author:action.payload}
        default:
            return state
    }
    }
export const setMusics = (musics) => ({type: SET_MUSICS, payload: musics})
export const setCurrentDir= (dir) => ({type: SET_CURRENT_DIR, payload: dir})
export const addMusic = (music) => ({type: ADD_MUSIC, payload: music})
export const deleteMusicAction=(dirId)=>({type: DELETE_MUSIC,payload:dirId})
export const getAuth=(author)=>({type:GET_AUTH,payload:author})