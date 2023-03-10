const mongoose=require('mongoose');

const sellerSchema=new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    }, 
    gender:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports=mongoose.model("sellers",sellerSchema)