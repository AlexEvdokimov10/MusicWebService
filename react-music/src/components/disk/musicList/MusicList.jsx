import React from 'react';
import Music from "./music/Music";
import {useSelector} from "react-redux";
import "./MusicList.scss"
import {getMusic} from "../../../actions/music";


const MusicList = () => {

    const musics=useSelector(state=> state.files.musics).map(music=><Music  key={music.id} music={music}/>)

    return (
        <div>
            <div className="music-list">
                {musics}
            </div>
            <audio id="audio" controls className="mt-20">
                <source id="music" type="audio/ogg" />
            </audio>
        </div>
    );
};

export default MusicList;