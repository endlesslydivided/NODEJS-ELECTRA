const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

module.exports = function(role) 
{
    return function (request, response, next) 
    {
        
        try 
        {
            const token = request.headers.authorization.split(' ')[1] 
            if (!token) 
            {
                return next(ApiError.notAuthorized("Неавторизованный доступ"));
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) 
            {
                return next(ApiError.notAuthorized("Недостаточно прав"));
            }
            request.user = decoded;
            return next()
        } 
        catch (e) 
        {
            return next(ApiError.notAuthorized("Неавторизованный доступ"));
        }
    };
}
