const {model,Schema,ObjectId}=require('mongoose')

const Music=new Schema({
    name:{type:String,required: true},
    time:{type:String,required:true},
    accessLink:{type:String},
    size:{type:Number,default:0},
    path:{type:String,default:''},
    user: {type: ObjectId, ref: 'User'},
    album:{type:ObjectId,ref:'Album',default:null},
    parent: {type: ObjectId, ref: 'Music'},
    childs: [{type: ObjectId, ref: 'Music'}],
})

module.exports=model('Music',Music)