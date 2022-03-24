const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class DeviceController
{
    async create(request,response,next)
    {
        try
        {
            const {name,price,brandId,typeId,info} = request.body;
            const {image} = request.files;

            let fileName = uuid.v4() + `.jpg`;
            image.mv(path.resolve(__dirname,'..','Static',fileName));
            const device = await Device.create({name,price,brandId,typeId,image: fileName});


            if(info)
            {
                info = JSON.parse(info);
                info.forEach(i =>
                    DeviceInfo.create(
                        {
                            title: i.title,
                            decription: i.decription,
                            deviceId: device.id
                        }
                    ))
            }
            
            return response.json(device);
        }
        catch(error)
        {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(request,response)
    {
        let {brandId,typeId,limit,page} = request.body;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let devices;

        if(!brandId && !typeId)
        {
            devices  = await Device.findAndCountAll({limit,offset});
        }
        else if(brandId && !typeId)
        {
            devices  = await Device.findAndCountAll({where :{brandId},limit,offset});
        }
        else if(!brandId && typeId)
        {
            devices  = await Device.findAndCountAll({where :{typeId},limit,offset});
        }
        else
        {
            devices  = await Device.findAndCountAll({where :{typeId,brandId},limit,offset});

        }
        return response.json(devices);
    }

    async getOne(request,response)
    {
        const {id} = request.params;
        const device = await Device.findOne(
            {
                where:{id},
                include : [{model: DeviceInfo,as: 'info'}]
            }
        )
        
        return response.json(device);
    }
}

module.exports = new DeviceController();