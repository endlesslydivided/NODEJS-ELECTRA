const {Rating,Device} = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController
{
    async create(request,response,next)
    {
        const {userId,deviceId,rate} = request.body;
        const rating = await Rating.create({userId,deviceId,rate}).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(rating);
    }

    async getAll(request,response,next)
    {
        const ratings = await Rating.findAll().catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(ratings);
    }

    
    async getAllByDevice(request,response,next)
    {
        let {deviceId} = request.params;

        const ratings = await Rating.findAll(
            {
                where:{deviceId},
                include : [{model: Device,as: 'device'}]
            }
        ).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(ratings);
    }

    async getAllList(request,response,next)
    {
        
        let {limit,page} = request.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let ratings;

        ratings  = await Rating.findAndCountAll({limit,offset});
        return response.json(ratings);
        
    }

    async getOne(request,response,next)
    {
        const {id} = request.params;
        const rating = await Rating.findOne(
            {
                where:{id}
            }
        )
        
        return response.json(rating);
    }

    async delete(request,response,next)
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