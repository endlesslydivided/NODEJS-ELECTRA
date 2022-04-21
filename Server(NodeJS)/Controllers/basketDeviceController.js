const {BasketDevice} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketDeviceController
{
    async create(request,response)
    {
        const {basketId,deviceId} = request.body;
        const basketDevice = await BasketDevice.create({basketId,deviceId});
        return response.json(basketDevice);
    }

    async getAll(request,response)
    {
        const basketDevices = await BasketDevice.findAll();
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