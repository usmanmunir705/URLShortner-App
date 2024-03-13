const mongoose  =require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String, 
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"NORMAL"
    }
},{timeStamps:true})

const User = mongoose.model("user" , userSchema);

module.exports=User;