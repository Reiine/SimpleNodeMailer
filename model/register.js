require('dotenv').config();
const mongoose = require('mongoose');
mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongoose connected")
}).catch((e)=>{
    console.log("can't connect to mongoose");
})


const regUser = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
    },
    token:{
        type:String
    }
})

const regUsers = new mongoose.model('regUsers', regUser);

module.exports=regUsers;
