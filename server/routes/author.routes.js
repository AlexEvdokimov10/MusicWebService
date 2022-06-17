const Router = require('express')
const router=new Router();
const adminMiddlewate=require("../middelware/role.middleware")
const userMiddlewate=require("../middelware/auht.middleware")
const authorController=require('../controllers/authorController')



router.post('/addAuthor',userMiddlewate,authorController.addAuthors)
router.post('/getAuthor',adminMiddlewate,authorController.getAuthor)

module.exports=router