const {Schema , ObjectId , model} = require ( "mongoose" );
const Album=new Schema({
    name:{type:String,required: true},
    dataRealise:{type:Date,required:true},
    path:{type:String,default:''},
    author:{type:ObjectId,ref:'Author'}
})

module.exports=model('Album',Album)