const {BasketDevice,Device, Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketDeviceController
{
    async create(request,response)
    {
        const {userId,deviceId} = request.body;
        const basketDevice = await BasketDevice.create({userId,deviceId});
        return response.json(basketDevice);
    }

    async getAll(request,response)
    {
        const basketDevices = await BasketDevice.findAll();
        return response.json(basketDevices);
    }

    async getAllList(request,response)
    {
        
        let {limit,page} = request.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let basketDevices;

        basketDevices  = await BasketDevice.findAndCountAll({limit,offset});
        return response.json(basketDevices);
        
    }

    async getAllListByUser(request,response)
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

            });
        return response.json(basketDevices);
        
    }

    async getAllByUser(request,response)
    {
        
        let {id} = request.params;

        let basketDevices  = await BasketDevice.findAll(
        {
            where:
            {
                userId :id,               
            },
        
            include : [{model: Device,as: 'device'}]
        });


        return response.json(basketDevices);
        
    }

    async getOne(request,response)
    {
        const {id} = request.params;
        const basketDevice = await BasketDevice.findOne(
            {
                where:{id}
            }
        )
        
        return response.json(basketDevice);
    }

    async delete(request,response)
    {
        const {id} = request.params;
        const basketDevice = await BasketDevice.destroy(
            {
                where:{id}
            }
        )
        
        return response.json(basketDevice);
    }

}

module.exports = new BasketDeviceController();