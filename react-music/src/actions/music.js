import axios from "axios";
import {addMusic , deleteMusicAction , getAuth , setMusics} from "../reduces/musicReducer";
import $ from "jquery";
import music from "../components/disk/musicList/music/Music";


export function getMusics(dirId){
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:27017/api/musics${dirId ? '?parentMusic='+dirId:''}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setMusics(response.data))
        } catch (e){
            alert(e.response.data.message)
        }
    }
}

export async function getMusic ( music ) {

        try {
            const response = await fetch ( `http://localhost:27017/api/musics/get-music?id=${ music._id }` , {
                headers : {Authorization : `Bearer ${ localStorage.getItem ( 'token' ) }`}
            } )
            if ( response.status === 200 ) {
                const blob = await response.blob ()
                const takerUrl = window.URL.createObjectURL ( blob );
                document.getElementById("")
                $ ( "source" ).attr ( "src" , takerUrl );
                $ ( "#audio" )[ 0 ].pause ();
                $ ( "#audio" )[ 0 ].load ();
                $ ( "#audio" )[ 0 ].$oncanplaythrough = $ ( "#audio" )[ 0 ].play ();

            }
        } catch (e) {
            alert ( e.response.data.message )
        }
}

export function uploadMusic(file,dirId){
    return async dispatch=>{
        try {
            const formData=new FormData()
            formData.append('music',file)
            if(dirId){
                formData.append('parentMusic',dirId)
            }
            const response=await axios.post('http://localhost:27017/api/musics/upload',formData,{
                headers : {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength=progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total',totalLength)
                    if(totalLength){
                        let progress=Math.round((progressEvent.loaded*100)/totalLength)
                        console.log(progress)
                    }
                }
            });
            dispatch(addMusic(response.data))

        }catch (e){
            alert(e.response.data.message)
        }
    }
}
export async function downloadMusic(music) {
    const response = await fetch(`http://localhost:27017/api/musics/download?id=${music._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if(response.status===200){
        const blob=await response.blob();
        const downloadUrl=window.URL.createObjectURL(blob);
        const link=document.createElement('a');
        link.href=downloadUrl
        link.download=music.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }

}
export function deleteMusic(music){
    return async dispatch=>{
        try {
            const response=await axios.delete(`http://localhost:27017/api/musics?id=${music._id}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteMusicAction(music._id))
            alert(response.data.message)
        } catch (e){
            alert(e?.response?.data?.message)
        }
    }
}

export function getAuthor(author){
    return async dispatch => {
        try {

            const response = await axios.get ( `http://localhost:27017/api/musics/get-authors?id=${author}` , {
                headers : {
                    Authorization : `Bearer ${ localStorage.getItem ( 'token' ) }`
                }
            } )
            dispatch ( getAuth ( response.data) )
        }
        catch (e){
            console.log(e.message)
        }
    }
}