const Router = require('express')
const router=new Router();
const authMiddlewate=require("../middelware/auht.middleware")
const albumController=require('../controllers/albumController')



router.post('/addAlbum',authMiddlewate,albumController.createMusicAlbum)
router.post('/addMusic',authMiddlewate,albumController.addMusic)

module.exports=router