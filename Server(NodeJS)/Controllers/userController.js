const {User} = require('../models/models');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const{User,Basket} = require('../Models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign
    (
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController
{
    async registration(request,response)
    {
        const{email,login,password} = request.body;

        if (!email || !password|| !login ) 
        {
            return next(ApiError.badRequest('Некорректный email,login или password'));
        }

        const candidate = await User.findOne({where: {email}});
        if (candidate) 
        {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        candidate = await User.findOne({where: {login}});
        if (candidate) 
        {
            return next(ApiError.badRequest('Пользователь с таким login уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, role, login, password: hashPassword});
        const basket = await Basket.create({userId: user.id});
        const token = generateJwt(user.id, user.email, user.role);

        return response.json({token});
    }

    async login(request,response)
    {
        const {email, password} = request.body;
        const user = await User.findOne({where: {email}});
        if (!user) 
        {
            return next(ApiError.internal('Пользователь не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) 
        {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }

    async check(request,response,next)
    {
        const {id} = request.query;
        if(!id)
        {
            return next(ApiError.badRequest('Не задан ID'));
        }
        response.json(id);
    }
}

module.exports = new UserController();