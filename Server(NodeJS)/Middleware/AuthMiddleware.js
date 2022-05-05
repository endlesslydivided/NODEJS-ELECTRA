const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError');

module.exports = function(request,response,next)
{

        try
        {
            const token = request.headers.authorization.split(' ')[1];
            if(!token)
            {
                return next(ApiError.notAuthorized("Неавторизованный доступ"));
    
            }
            const decoded = jwt.verify(token,process.env.SECRET_KEY);
            request.user = decoded;
            return next();
        }
        catch(error)
        {
            return next(ApiError.notAuthorized("Неавторизованный доступ"));
        }
       
}