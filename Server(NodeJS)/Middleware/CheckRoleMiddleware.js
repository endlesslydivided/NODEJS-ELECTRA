const jwt = require('jsonwebtoken')

module.exports = function(role) 
{
    return function (request, response, next) 
    {
        if (request.method === "OPTIONS") 
        {
            return next()
        }
        
        try 
        {
            const token = request.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            if (!token) 
            {
                return response.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) 
            {
                return response.status(403).json({message: "Нет доступа"})
            }
            request.user = decoded;
            return next()
        } 
        catch (e) 
        {
            return response.status(401).json({message: "Не авторизован"})
        }
    };
}
