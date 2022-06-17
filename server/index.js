
const express=require("express")
const mongoose=require("mongoose")
const config = require("config")
const musicUpload=require("express-fileupload");
const authRouter=require('./routes/auth.routes')
const authorRouter=require('./routes/author.routes')
const musicRouter=require('./routes/music.routes')
const albumRouter=require('./routes/album.routes')

const app=express()
const PORT=config.get("serverPort")
const corsMiddleware = require('./middelware/cors.middleware')

app.use(musicUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/auth/edit-user",authRouter)
app.use("/api/musics", musicRouter)
app.use("/api/auth/authors",authorRouter)
app.use("/api/auth/albums",albumRouter)

const start=async ()=>{
    try{
      await mongoose.connect(config.get("dbUrl"),{
          useNewUrlParser:true,
          useUnifiedTopology:true
      })

        app.listen(PORT,()=>{
            console.log("Server started on port",PORT)
        })
    } catch (e){
        console.log(e.message)
    }

}
start()