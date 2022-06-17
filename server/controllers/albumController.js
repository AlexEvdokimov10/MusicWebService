
const albumService=require("../services/albumService")
const User = require('../models/User')
const Music = require('../models/Music')
const Author=require('../models/Author')
const Album=require('../models/Album')
const config=require('config')


const fs=require('fs')
const {ObjectId , models} = require("mongoose");


class AlbumController{

    async createMusicAlbum(req,res){
        try{
            const auhtor=await Author.findOne({user:req.body.id})

            if(auhtor)
            {
                const tempAlbum=await Album.findOne({name:req.body.name})
                if(!tempAlbum)
                {
                    const {name , dataRealise} = req.body
                    const album = new Album ( {name , dataRealise} )
                    album.path = name
                    await albumService.createAlbumDir ( album , req.body.id )
                    await album.save ()
                    return res.json ( album )
                }
                return res.status(400).json({message:"This album already exists"})
            }
            return res.status(400).json({message:"This is user is not author"})
        }catch (e){
            console.log(e)
            return res.status(400).json(e)
        }
    }
    async addMusic(req,res){
        try{
            const authorId=req.query.id
            const albumName=req.query.name
            const file=req.files.music
            const author=await Author.findOne({user:authorId})
            if(author)
            {
                const tempAlbum=await Album.findOne({name:albumName})
                if(tempAlbum)
                {
                    const user=await User.findOne({_id:req.user.id})

                    let path;
                        path=`${config.get('musicPath')}\\${user._id}\\${tempAlbum.name}\\${file.name}`


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
                            user: user._id,
                            album:tempAlbum._id
                        })
                        await dbMusic.save()
                        user.musicAmount=await Music.collection.find({user:user._id}).count()
                        await user.save()
                        return res.json(dbMusic)
                    }
                }
                return res.status(400).json({message:"This album already exists"})
            }
            return res.status(400).json({message:"This is user is not author"})
        }catch (e){
            console.log(e)
            return res.status(400).json({message:"Can't add music into album"})
        }
    }


}

module.exports=new AlbumController()