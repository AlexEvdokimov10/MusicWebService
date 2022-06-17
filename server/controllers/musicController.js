const musicService=require("../services/music.Service")
const User = require('../models/User')
const Music = require('../models/Music')
const Author=require('../models/Author')
const Album=require('../models/Album')
const Playlist=require('../models/PlayList')
const config=require('config')


const fs=require('fs')
const {ObjectId} = require("mongoose");


class MusicController{
    async createMusicDir(req,res){
        try{
            const {name,time,parentMusic}=req.body
            const music=new Music({name,time, parentMusic,user:req.user.id})
            const parent=await Music.findOne({_id:parentMusic})
            if(!parent){
                music.path=name
                await musicService.createMusicDir(music)
            }
            else {
                music.path=`${parent.path}\\${music.name}`
                await musicService.createMusicDir(music)
                parent.childs.push(music._id)
                await parent.save()
            }
            await music.save()
            return res.json(music)
        }catch (e){
            console.log(e)
            return res.status(400).json(e)
        }
    }
    async getMusics(req,res){
        try {
            const musics=await Music.find({user:req.user.id,parentMusic:req.query.parentMusic}).limit(10)
            return res.json(musics)
        }
        catch (e){
            console.log(e)
            return res.status(500).json({message: "Can not get musics"})

        }
    }
    async getMusic(req,res){
        try {
            const file=await Music.findOne({_id: req.query.id, user: req.user.id})
            let path="";
            console.log(file)
            if(!file.album) {
                path = config.get ( 'musicPath' ) + '\\' + req.user.id + '\\' + file.path + '\\' + file.name
            }
            else{
                const album=await Album.findOne({_id:file.album});
                path = config.get ( 'musicPath' )+'\\'+req.user.id+'\\'+album.name+'\\'+file.name
            }
            if(fs.existsSync(path)) {
                console.log(path)
                return res.download(path,file.name)
            }

            console.log(res.status(400))
        }
        catch (e){
            console.log(e)
            return res.status(500).json({message: "Can not get musics"})

        }

    }

    async uploadMusic(req,res){
        try{
            const file=req.files.music
            const parent=await Music.findOne({user:req.user.id,_id: req.body.parentMusic})
            const user=await  User.findOne({_id:req.user.id})


            let path;
            if(parent){
                path=`${config.get('musicPath')}\\${user._id}\\${parent.path}\\${file.name}`
            }else{
                path=`${config.get('musicPath')}\\${user._id}\\${file.name}`
            }

            if(fs.existsSync(path)){
                return res.status(400).json({message:"Music already exist"})
            }

            const type = file.name.split('.').pop()

            if(type==="mp3" | type==="wma" | type==="mp2" || type==="amr") {
                file.mv(path)

                const dbMusic = new Music({
                    name: file.name,
                    time: "0:00",
                    size: file.size,
                    path: parent?.path,
                    user: user._id,
                    album:null,
                    parent: parent?._id,
                })
                await dbMusic.save()
                user.musicAmount=await Music.collection.find({user:user._id}).count()
                await user.save()
                res.json(dbMusic)
            }
            else {
                return res.status(415).json({message: "user has tried upload incorrect format"})
            }
        }
        catch (e){
            console.log(e)
            return res.status(500).json({message:"Upload error"})
        }
    }
    async downloadMusic(req,res) {
        try{
            const file=await Music.findOne({_id: req.query.id, user: req.user.id})
            let path="";
            if(!file.album) {
                path = config.get ( 'musicPath' ) + '\\' + req.user.id + '\\' + file.path + '\\' + file.name
            }
            else{
                const album=await Album.findOne({_id:file.album});
                path = config.get ( 'musicPath' )+'\\'+req.user.id+'\\'+album.name+'\\'+file.name
            }
            if(fs.existsSync(path)){
                return res.download(path,file.name)
            }

            console.log(res.status(400))
            return res.status(400).json({message:"Download error"})
        }
        catch (e){
            console.log(e)
            res.status(500).json({message:"Download error"})
        }
    }

    async deleteMusic(req,res){
        try{
            const user=await  User.findOne({_id:req.user.id})
            const file= await  Music.findOne({_id: req.query.id,user: req.user.id})
            if(!file){
                return res.status(400).json({message:'music file not found'})
            }
            musicService.deleteMusic(file)
            await file.remove()
            return res.json({message:'Music was deleted'})
        }catch (e){
            console.log(e)
            return res.status(400).json({message:"music couldn't be deleted"})
        }

    }





}
module.exports=new MusicController()