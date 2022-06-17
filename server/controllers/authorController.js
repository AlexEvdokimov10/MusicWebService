const Author = require ( "../models/Author" );
const User = require ( "../models/User" );


class AuthorController{
    async getAuthor(req,res){
        try {
            const author= await Author.findOne({_id:req.query.id})
            return res.json(author)
        }
        catch (e){
            return res.status(500).json({message: "Can not get author"})
        }
    }

    async addAuthors(req,res){
        try {
            console.log(req.body.name)
            const user=await User.findOne({_id:req.user.id})
            const author=await Author.findOne({name:req.body.name})
            if(author){
                return res.status(400).json({message: `Author with this name already exist`})
            }
            const newAuthor=new Author({
                name:req.body.name,
                user:user._id
            })
            await newAuthor.save()
            return res.json({message:"Author was created"})
        }
        catch (e){
            return res.status(500).json({message: "Can not create author"})
        }
    }
}
module.exports=new AuthorController()