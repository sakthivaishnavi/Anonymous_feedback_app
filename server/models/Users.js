const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    no:{
        type:Number,
        required:true,
        unique:true,
    },
    name: {
        type:String,
        required:true,
        unique: true,
    },
   
});
const UserModel=mongoose.model("users",UserSchema)

module.exports=UserModel