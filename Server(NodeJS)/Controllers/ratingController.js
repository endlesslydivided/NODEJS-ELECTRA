const {Rating} = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController
{
    async create(request,response)
    {
        const {userId,deviceId,rate} = request.body;
        const rating = await Rating.create({userId,deviceId,rate});
        return response.json(rating);
    }

    async getAll(request,response)
    {
        const ratings = await Rating.findAll();
        return response.json(ratings);
    }

    async getAllList(request,response)
    {
        
        let {limit,page} = request.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let ratings;

        ratings  = await Rating.findAndCountAll({limit,offset});
        return response.json(ratings);
        
    }

    async getOne(request,response)
    {
        const {id} = request.params;
        const rating = await Rating.findOne(
            {
                where:{id}
            }
        )
        
        return response.json(rating);
    }

    async delete(request,response)
    {
        const {id} = request.params;
        const rating = await Rating.destroy(
            {
                where:{id}
            }
        )
        
        return response.json(rating);
    }

}

module.exports = new RatingController();