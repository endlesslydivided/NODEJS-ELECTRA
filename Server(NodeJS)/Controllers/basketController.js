const {Basket} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController
{
    async create(request,response)
    {
        const {userId} = request.body;
        const basket = await Basket.create({userId});
        return response.json(basket);
    }

    async getAll(request,response)
    {
        const baskets = await Basket.findAll();
        return response.json(baskets);
    }

    async getOne(request,response)
    {
        const {id} = request.params;
        const basket = await Basket.findOne(
            {
                where:{id}
            }
        )
        
        return response.json(basket);
    }
}

module.exports = new BasketController();