//create response
  const createResponse = params => {
    const { response, code, success, message, data = {}, error = {} } = params;
    if(code == 422 || code == 501 || code == 401){
      return response.status(code).json({
        success,
        message,
        error,
      });
    } else {
     return response.status(code).json({
      success,
      message,
      data,
    });
   }
  };

//create sucess response
const createSuccessResponse = (
    response,
    message = 'Success',
    data = {},
    code = 200,
    ) =>
   createResponse({
    response,
    message,
    data,
    code,    
  });

//create error response
const createErrorResponse = (
    request,
    response,
    message = 'Server Internal Error',
    error = {},
    code = 422,
    ) => {
    
    return createResponse({
      response,
      code,
      message,
      error,
    });
  };
  

module.exports = {
    createResponse,
    createSuccessResponse,
    createErrorResponse,
};
