const Joi = require('@hapi/joi');
const { createErrorResponse } = require('../helper/errorhandler');

    //register schema validation
    var userSchema = Joi.object().keys({
    firstname: Joi.string().label('firstname is required').required(),
    lastname: Joi.string().label('lastname is required').required(),
    DOB: Joi.date().iso().label('DOB is required').required(),
    address: Joi.string().label('address is required').required(),
    email: Joi.string().label('email is required').required(),
    mobile: Joi.number().label('10 Digit mobile no is required').required(),
    password: Joi.string().label('password is required').required(),
    image: Joi.string().label('image is required').required(),
    deviceToken:  Joi.string().label('deviceToken is required').required(),
    devicetype: Joi.string().label('devicetype is required'),
    otp:Joi.string().label('otp is required'),
    currentdate:Joi.date().iso(),
    status: Joi.string().label('status is required'),
    }).options({abortEarly : false});

    module.exports = {

    validateRegisterSchema :async (req, res, next) => {
      const result = Joi.validate(req.body, userSchema);
      if( result.error ) {
        var error = {};
        var message = '';
        for(var i= 0; i < result.error.details.length;i++) {
            const key = result.error.details[i]['context'].key;
            error[`${key}`] = result.error.details[i]['context'].label;
            message = "please required below field"
        }
        return createErrorResponse(req, res, message, error, 422); 
      }else {
          next()
      }
    }
  }

    


  




