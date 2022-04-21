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
            const {img} = request.files;

            let fileName = uuid.v4() + `.jpg`;
            img.mv(path.resolve(__dirname,'..','Static',fileName));
            const device = await Device.create({name,price,brandId,typeId,image: fileName});


            if(info)
            {
                const infos= JSON.parse(info);
                infos.forEach(i =>
                    DeviceInfo.create(
                        {
                            title: i.title,
                            description: i.description,
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

    async update(request,response,next)
    {
        try
        {
            const {name,price,brandId,typeId,info} = request.body;
            const {id} = request.params;

            const device = await Device.update({name,price,brandId,typeId}, 
                {
                    where: 
                    {
                        id: id
                    }
                }
                );


            if(info)
            {
                const infos= JSON.parse(info);
                if(infos.length == 0)
                {
                    DeviceInfo.destroy(

                        {
                            where:
                            {
                                deviceId: id
                            }
                        }
                    );
                }
                infos.forEach(i =>
                    DeviceInfo.update(
                        {
                            title: i.title,
                            description: i.description,
                            
                        }
                        ,
                        {
                            where:
                            {
                                deviceId: id
                            }
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
        let {brandId,typeId,limit,page} = request.query;

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

    async delete(request,response)
    {
        const {id} = request.params;
        const device = await Device.destroy(
            {
                where:{id}
            }
        )
        
        return response.json(device);
    }
}

module.exports = new DeviceController();