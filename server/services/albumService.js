const config = require ( "config" );
const fs = require ( "fs" );

class AlbumService {

   createAlbumDir(album,userId){
       const albumPath=`${config.get('musicPath')}\\${userId}\\${album.name}`
        return new Promise((resolve,reject)=>{
            try{
                console.log(albumPath)
                if(!fs.existsSync(albumPath)){
                    fs.mkdirSync(albumPath)
                    return  resolve({message:'Album was add'})
                } else {
                    return reject({message: 'Album already exist'})
                }
            }
            catch (e){
                return reject({message:'Album error'})
            }
        })
    }
}

module.exports=new AlbumService()