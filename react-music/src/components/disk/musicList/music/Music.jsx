import React from 'react';
import "./Music.scss"
import {useDispatch , useSelector} from "react-redux";
import {deleteMusic , downloadMusic , getAuthor , getMusic} from "../../../../actions/music";





const Music = ({music}) => {

    const author=useSelector(state=>state.files.author)
    const dispatch = useDispatch()
    function downloadClickHandler(event) {
        event.stopPropagation()
        downloadMusic(music)

    }
    function deleteClickHandler(event) {
        event.stopPropagation()
        dispatch(deleteMusic(music))
    }
    function playClickHandler(event) {
        getMusic(music)
        dispatch(getAuthor(music.author))
    }
    return (
        <div>
            <div className="card ml-10 ">
                <span className="music-name">
                    {music.name.split('.')[0]}
                </span>
            <div className="content">
                <div>
                </div>
                <div className="card-background br-radius">
                    <button className="mt-30">
                        <img className="br-radius m-5" width={ 142 } height={ 142 } src="img/monster.jpg" alt=""/>
                    </button>
                    <div className="unliked">
                        <img width={ 20 } height={ 20 } src="/img/unliked.svg" alt="unliked"/>
                    </div>
                </div>
                   {author?._id===music?.author &&  <span className="music-Author"> Lyrics: {author?.name} </span>}

                <div className="d-flex">
                    <button className="music-download btn"
                            onClick={ ( event ) => downloadClickHandler ( event ) }>download
                    </button>
                    <button onClick={ ( event ) => playClickHandler ( event ) } className="music-play btn">play
                    </button>
                    <button onClick={ ( event ) => deleteClickHandler ( event ) } className="music-delete btn">delete
                    </button>

                </div>
            </div>
        </div>
    </div>
    );
};

export default Music;