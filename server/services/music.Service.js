const fs = require('fs')
const Music =require('../models/Music')
const User =require('../models/User')
const config=require('config')
const Album = require ( "../models/Album" );

class MusicService{

    createMusicDir(music){
        const musicPath=`${config.get('musicPath')}\\${music.user}\\${music.path}`
        return new Promise((resolve,reject)=>{
            try{
                if(!fs.existsSync(musicPath)){
                    fs.mkdirSync(musicPath)
                    return  resolve({message:'Music was add'})
                } else {
                    return reject({message: 'Music already exist'})
                }
            }
            catch (e){
                return reject({message:'Music error'})
            }
        })
    }
    async deleteMusic(music){
        const path= await this.getPath(music)
        console.log(path)
        music.user.musicAmount-=1;
        fs.unlinkSync(path)
    }

   async getPath(music) {

        if(!music.album) {
            return config.get ( 'musicPath' ) + '\\' + music.user+ '\\'  + music.name
        }
        else{
            const album=await Album.findOne({_id:music.album});
            return  config.get ( 'musicPath' )+'\\'+music.user+'\\'+album.name+'\\'+music.name
        }
    }
}

module.exports=new MusicService()