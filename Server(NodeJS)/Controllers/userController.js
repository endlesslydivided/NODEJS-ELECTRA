const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const {validateAuth} = require("../Utils/validation")
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) 
    {
        try
        {
        const {email, password, role} = req.body
        let validation = validateAuth(email,password);
        if(validation.status)
        {
            return next(new ApiError.badRequest(validation.message))
        }
        if (!email || !password)
        {
            return next(new ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) 
        {
            return next(new ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    } catch (error) {
        next(ApiError.internal("Ошибка на стороне сервера"))
    } 
    }

    async login(req, res, next) {
        try
        {
        const {email, password} = req.body
        let validation = validateAuth(email,password);
        if(validation.status)
        {
            return next(new ApiError.badRequest(validation.message))
        }
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(new ApiError.badRequest('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) 
        {
            return next(new ApiError.badRequest('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    } catch (error) {
        next(ApiError.internal("Ошибка на стороне сервера"))
    } 
    }

    async check(req, res, next) {
        try
        {
        let token;
        try
        {
             token = generateJwt(req.user.id, req.user.email, req.user.role)

        }
        catch(error)
        {
            next(new ApiError.notAuthorized(error.message));

        }
        return res.json({token})
    } catch (error) {
        next(ApiError.internal("Ошибка на стороне сервера"))
    } 
    }

    async getAllList(request,response)
    {
        try
        {
        let {limit,page} = request.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let users;

        users  = await User.findAndCountAll({limit,offset}).catch((error) => 
        {            
            next(new ApiError.internal(error.message));
        });;
        return response.json(users);
    } catch (error) {
        next(ApiError.internal("Ошибка на стороне сервера"))
    } 
        
    }
}

module.exports = new UserController()
