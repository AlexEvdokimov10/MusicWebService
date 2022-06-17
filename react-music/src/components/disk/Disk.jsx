import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMusic , getMusics , uploadMusic} from "../../actions/music";
import Header from "../header/Header";
import MusicList from "./musicList/MusicList";
import "./Disk.scss"
import {getUsers} from "../../actions/user";
import {NavLink} from "react-router-dom";


const Disk = () => {
    const dispatch=useDispatch()
    const currentDir=useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)

    function musicUploadHandler(event) {
        const musics=[...event.target.files]
        musics.forEach(music=>dispatch(uploadMusic(music,currentDir)))
    }


    useEffect(()=>{
        dispatch(getMusics(currentDir))
    },[currentDir])

    return (
        <div className="disk">
            <div className="body wrapper clear">
                <Header/>
                <div className="content p40">
                    <div className="d-flex align-center mb-40">
                        <h1>All Music</h1>
                        <div className="search-block ml-30 d-flex">
                            <img width={20} height={20} src="img/union.svg" alt="Search"/>
                            <input placeholder="Search"/>
                        </div>
                    </div>
                        <MusicList/>
                </div>
                <div className="disk_upload">
                    <label htmlFor="disk_upload-input" className="disk_upload-label">Upload</label>
                    <label className="file">
                        <input multiple={true} name="file" aria-label="File browser example" onChange={(event)=>musicUploadHandler(event)} type="file" id="disk_upload-input"  className="disk_upload-input" />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Disk;