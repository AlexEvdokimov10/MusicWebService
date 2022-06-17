const Router = require('express')
const router=new Router();
const authMiddlewate=require("../middelware/auht.middleware")
const musicController=require('../controllers/musicController')

router.post('',authMiddlewate,musicController.createMusicDir)
router.post('/upload',authMiddlewate,musicController.uploadMusic)
router.get('',authMiddlewate,musicController.getMusics)
router.get('/get-music',authMiddlewate, musicController.getMusic)
router.get('/download',authMiddlewate,musicController.downloadMusic)
router.delete('/',authMiddlewate,musicController.deleteMusic)

module.exports=router