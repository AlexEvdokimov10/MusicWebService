const Router=require("express")
const User=require("../models/User")
const bcrypt = require("bcryptjs")
const config=require("config")
const {check,validationResult}=require("express-validator")
const jwt = require("jsonwebtoken");
const router=new Router()
const authMiddleware=require('../middelware/auht.middleware')
const musicService=require('../services/music.Service')
const Music = require("../models/Music")
const Role=require("../models/Role")
router.post('/registration',[check('email',"Uncorrect email").isEmail(),
check('password',"Password must be longer than 6 and shorter than 12").isLength({min:6,max:12})
],async (req, res) => {
    try {
        console.log(req.body)
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message:"Uncorrect request"})
        }
        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message: `User with email ${email} already exist`})
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const userRole=await Role.findOne({value:"USER"})
        const user=new User({email,password:hashPassword,roles:[userRole.value]})
        await user.save()
        await musicService.createMusicDir(new Music({user:user.id,name:''}))
        return res.json({message:"Account was created"})
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})


router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: "User not found"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({message: "Invalid password"})
            }
            const token = jwt.sign({id: user.id,roles:user.roles}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id:user.id,
                    email:user.email,
                    roles:user.roles,
                    musicAmount:user.musicAmount,
                    avatar:user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user:{
                    id:user.id,
                    email:user.email,
                    roles:user.roles,
                    musicAmount:user.musicAmount,
                    avatar:user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.patch('/edit-user', authMiddleware,
    async (req, res) => {
        try {

            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            if(req.body.password){
                req.body.password=await bcrypt.hash(req.body.password, 8)
            }
            await user.updateOne(req.body)

            return res.json({
               message:"User was updated"
            },)
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get ( '/get-users' , authMiddleware ,
    async ( req , res ) => {
        try {
            const users = await User.find ()
            res.json ( users )
        } catch (e) {
            console.log(e)
        }
    } )







module.exports = router

