const ApiError = require('../Error/ApiError.js');

module.exports = function(error,request,response,next)
{
    if(error instanceof ApiError)
    {
        return response.status(error.status).json({message: error.message});
    }
    return response.status(500).json({message: error.message ? error :`Непредвиденная ошибка на стороне сервера`});
}