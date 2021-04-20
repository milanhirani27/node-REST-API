const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/userController')
const { validateRegisterSchema } = require('../validation/registervalidation');
const { verifyUser } = require('../validation/verifyUserValidatiom');
const { resendOtp } = require('../validation/resendValidation');
const { resetPassword } = require('../validation/resetPassValidation');
const { loginUser } = require('../validation/loginValidation')
const checkAuth = require('../authentication/check-auth');
const uploadImage = require('../middlewares/file-upload/upload-image');


//user router
router.post('/signup',validateRegisterSchema, usercontroller.signup);

router.post('/upload', uploadImage('image'), usercontroller.upload);

router.post('/verify',verifyUser, usercontroller.verify);

router.post('/resend', resendOtp,usercontroller.resendOtp);

router.post('/resetpass',checkAuth,resetPassword, usercontroller.resetpassword);

router.post('/login',loginUser, usercontroller.login);

module.exports = router;