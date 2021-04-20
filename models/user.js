const { string } = require("joi");
const mongoose = require("mongoose");

//user schema
const userSchema = new mongoose.Schema({

    firstname:{ 
        type: String, 
        required: true,
        
    },
    lastname:{ 
        type: String, 
        required: true,
       
    },

    DOB: {
        type: Date,
    },

    address:{
        type: String
    },

    email: { 
        type: String,
        required: true,
        index:{
            unique: true,
        },
        match:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
    },

    mobile:{
        type:String,
        index:{
            unique: true,
        },
        maxlength:10
    },

    password: { 
        type: String, 
        required: true,
    },

    deviceToken:String,

    devicetype:{
        type: String,
        default: 'A'
    },

    otp:{
        type:Number,
        index:{
            unique:false,
            default : null
        }
    },

    createdDate:{
        type: Date,
        default :Date.now
    },

    updatedDate:{
        type: Date
    },

    token: String,
    
    type:String,
    
    image:String,

    deviceToken:String,

    status:{
        type:String,
        default : 'Un-verify'
    },  
});


const usermodel = new mongoose.model('user',userSchema);

module.exports = usermodel;