const jwt = require('jsonwebtoken');
const { createErrorResponse } = require('../helper/errorhandler')


//check authentication
module.exports = ( req, res, next ) => {
    try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'tokengeneration');
    req.userData = decoded;
    next();
    } catch (error) {
        return createErrorResponse(req, res, "UnAuthorized User ", {error:"Can not add any Details"}, 401);
    }
};
