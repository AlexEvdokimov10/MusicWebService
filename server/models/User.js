const {Schema,model,ObjectId}=require("mongoose")


const User=new Schema({
    email:{
        type:String,required:true,unique:true
    },
    password:{
        type:String,required:true
    },
    roles: [{type: String, ref: 'Role'}],
    musicAmount:{
        type:Number,default:0
    },
    avatar:{
        type:String
    },
    musics:[{type:ObjectId,ref:`Music`}]
})

module.exports=model('User',User)