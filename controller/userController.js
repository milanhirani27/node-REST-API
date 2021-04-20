const usermodel = require('../models/user');
const jwt = require('jsonwebtoken');
const { createSuccessResponse, createErrorResponse } = require('../helper/errorhandler');
const sendEmail = require('../email/sendEmail')
var ejs = require('ejs');


// user registration
exports.signup  = async (req, res, next) => {
    try{
        usermodel.findOne({email: req.body.email}, async (err, user) =>{
        if(user){
            return createErrorResponse(req, res, "email is already exist", {email:"email is already exist"}, 422); 
            }else{
                usermodel.findOne({mobile: req.body.mobile}, async (err, user) =>{
                    if (user) {
                        return createErrorResponse(req, res, "mobile is already exist", {mobile:"mobile is already exist"}, 422); 
                        }
                        if(!err){
                            const userdata = new usermodel(req.body);
                            const mobile = req.body.mobile;
                            if(mobile.length != 10){
                                return createErrorResponse(req, res, "valid mobile no is required", {mobile:"Please enter 10 digit mobile no:"}, 422); 
                            }
                            await userdata.save();  
                                var oneTimePass = Math.floor(Math.random()*999999)
                                sentOTP = oneTimePass;
                                    usermodel.findOne({email: req.body.email}, async (err, user) =>{
                                        if(user){
                                            //Otp send		
                                            sendEmail(
                                                userdata.email,
                                                "User OTP Verification",
                                                "Your OTP is " + oneTimePass,
                                            );                 
                                        }
                                    })
                                userdata.otp = oneTimePass,
                                userdata.save()
                                var responsedata ={
                                    otp:userdata.otp
                                }
                                return createSuccessResponse(res, 'User Registration successfully and Verify Your User', responsedata, 200);
                            }else{
                                message = 'please required below field'
                                var errors = {};  
                                for( i in error.errors ){
                                errors[i] = error.errors[i].message;
                                }
                            return createErrorResponse(req, res, message, errors, 422); 
                        }
                    });    
                }
            });           
        }
    catch(error){
    next(error);
    }
}
 
//verification
exports.verify = async (req, res) => {     
    try{
        const enterEmail = req.body.email;
        const enterOtp = req.body.otp;
        const user = await usermodel.findOne({ otp :enterOtp , email : enterEmail});
        if(user){
            const token = jwt.sign({ _id: user._id.toString() }, 'tokengeneration');
                    user.updatedDate = Date.now(),
                    user.status = "verified user",
                    user.token = token,
                    user.otp = null
                    user.save()
            
                    var responsedata = {
                        firstname: user.firstname,
                        lastname:user.lastname,
                        DOB:user.DOB,
                        address:user.address,
                        email:user.email,
                        mobile:user.mobile,
                        devicetype:user.devicetype,
                        createdDate:user.createdDate,
                        updatedDate:user.updatedDate,
                        status:user.status,
                        image:user.image,
                        token
                        }
                    return createSuccessResponse(res, 'User Verify successfully',  responsedata, 200);  
            }else{
                return createErrorResponse(req, res, "Otp expired", {error:"Please enter valid otp"}, 422);
            }
        }
    catch(error){
       console.log(error);
    }
}

exports.resendOtp = async(req,res)=>{

    const type = req.body.type;
    if(type){
        const user = await usermodel.findOne({email : req.body.email});
        if(user){
            var oneTimePass = Math.floor(Math.random()*999999)
            sentOTP = oneTimePass;
            //Otp send		
            sendEmail(
                user.email,
                "User OTP Verification",
                "Your OTP is " + oneTimePass,
                );    
                user.otp = oneTimePass,
                    user.type = type,
                    user.save()
                    var responsedata ={
                    otp:user.otp
                }
            return createSuccessResponse(res, 'Otp Send Sucessfully...', responsedata, 200); 
        }else{
            return createErrorResponse(req, res, "Otp doesn't send...", {error:"Please enter valid email"}, 422);
        }
    }
}
      
//reset password
exports.resetpassword = async(req,res)=>{

    try{
        const email = req.body.email;
        const Password = req.body.passwordConfirm;
        const enterOtp = req.body.otp;
        const user = await usermodel.findOne({ email :email });
        if(!user){
            return createErrorResponse(req, res, "Reset Passward Failed", {email:"Please enter valid email"}, 422); 
        }
        if(user.otp==enterOtp){
            user.password = Password;
            user.otp = null
            user.save()
            return createSuccessResponse(res, 'Password Change Sucessfully...',[], 200); 
        }else{
            return createErrorResponse(req, res, "Reset Passward Failed", {otp:"Please enter valid Otp"}, 422); 
        }
    }
    catch(error){
        console.log(error);
    }
}


//login
exports.login = async (req, res) => {     
    try{
        const enterEmail = req.body.email;
        const enterPassword = req.body.password;
        const user = await usermodel.findOne({ password :enterPassword , email : enterEmail});
        if(user){
            const token = jwt.sign({ _id: user._id.toString() }, 'tokengeneration');
            user.updatedDate = Date.now(),
            user.status = "verified user",
            user.token = token,
            user.save()
            
            var responsedata = {
                firstname: user.firstname,
                lastname:user.lastname,
                DOB:user.DOB,
                address:user.address,
                email:user.email,
                mobile:user.mobile,
                devicetype:user.devicetype,
                createdDate:user.createdDate,
                updatedDate:user.updatedDate,
                status:user.status,
                image:user.image,
                token
                }
            return createSuccessResponse(res, 'User Login successfully',  responsedata, 200);  
        }else{
            return createErrorResponse(req, res, "Invalid user name & password", {error:"Invalid cradinality"}, 422);
        }
    }
    catch(error){
       console.log(error);
    }
}


//only image upload
exports.upload = function(req, res, next) {
    if(!req.file) {
      res.status(500);
      return next(err);
      }
        var fileupload ={
        fileUrl: 'http://localhost:3000/uploads/images' + req.file.filename,
        filename: req.file.filename
    }
   return createSuccessResponse(res,"Upload File Successfully",fileupload, 200)
  };