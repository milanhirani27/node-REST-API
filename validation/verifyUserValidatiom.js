const Joi = require('@hapi/joi');
const { createErrorResponse } = require('../helper/errorhandler');

    //register schema validation
    var verifyUserSchema = Joi.object().keys({
    email: Joi.string().label('email is required').required(),
    otp:Joi.string().label('otp is required').required(),
    }).options({abortEarly : false});

    module.exports = {

    verifyUser :async (req, res, next) => {
      const result = Joi.validate(req.body, verifyUserSchema);
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

    


  




