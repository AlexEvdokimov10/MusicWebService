const {Schema , ObjectId , model} = require ( "mongoose" );
const PlayList=new Schema({
    name:{type:String,required: true},
    user:{type: ObjectId,ref: 'User',sparse:true},
})

module.exports=model('PlayList',PlayList)