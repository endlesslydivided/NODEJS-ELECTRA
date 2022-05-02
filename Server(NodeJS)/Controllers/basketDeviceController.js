const {BasketDevice,Device, Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketDeviceController
{
    async create(request,response,next)
    {
        const {userId,deviceId} = request.body;
        const basketDevice = await BasketDevice.create({userId,deviceId}).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(basketDevice);
    }

    async getAll(request,response,next)
    {
        const basketDevices = await BasketDevice.findAll().catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(basketDevices);
    }

    async getAllList(request,response,next)
    {
        
        let {limit,page} = request.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let basketDevices;

        basketDevices  = await BasketDevice.findAndCountAll({limit,offset}).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(basketDevices);
        
    }

    async getAllListByUser(request,response,next)
    {
        
        let {limit,page} = request.query;
        let {id} = request.params;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let basketDevices;

        basketDevices  = await BasketDevice.findAndCountAll(
            {
                limit,
                offset,
                where:
                {
                    userId:id
                },
                include : [{all: true, nested: true }]

            }).catch((error) => 
            {            
                next(ApiError.internal(error.message));
            });
        return response.json(basketDevices);
        
    }

    async getAllByUser(request,response,next)
    {
        
        let {id} = request.params;

        let basketDevices  = await BasketDevice.findAll(
        {
            where:
            {
                userId :id,               
            },
        
            include : [{model: Device,as: 'device'}]
        }).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });


        return response.json(basketDevices);
        
    }

    async getOne(request,response,next)
    {
        const {id} = request.params;
        const basketDevice = await BasketDevice.findOne(
            {
                where:{id}
            }
        ).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        
        return response.json(basketDevice);
    }

    async delete(request,response,next)
    {
        const {id} = request.params;
        const basketDevice = await BasketDevice.destroy(
            {
                where:{id}
            }
        ).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        
        return response.json(basketDevice);
    }

}

module.exports = new BasketDeviceController();