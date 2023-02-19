const mongoose=require('mongoose');
const Object=mongoose.Schema.Types.ObjectId

const bookSchema=new mongoose.Schema({
    bookCover:{
        type:String,
        required:true,
       },
       title: {
           type: String,
           required: true,
       },
       category: {
        type: String,
        required: true,
     
       },
       sellerId:{
        type:Object,
        ref:"seller"
      },
      isDeleted:{
        type:Boolean,
        default:false
      }

},{timestamps:true})
module.exports=mongoose.model("books",bookSchema)