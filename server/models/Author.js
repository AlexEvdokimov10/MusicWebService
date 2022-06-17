const {model,Schema,ObjectId}=require('mongoose')

const Author=new Schema({
    name:{type:String,unique: true,default:"nameless"},
    user:{type:ObjectId,ref:'User'}
})

module.exports=model('Author',Author)