const {Device, DeviceInfo, Rating} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const {Op,Sequelize,QueryTypes } = require('Sequelize');
const { sequelize } = require('sequelize/lib/model');
const {validateDevice} = require("../Utils/validation")

class DeviceController
{
    async create(request,response,next)
    {
        try
        {
            const {name,price,brandId,typeId,info} = request.body;
            const {img} = request.files;

            let validation = validateDevice(typeId,
                brandId,
                name,
                price,
                img,
                info);
            if(validation.status)
            {
                return next(ApiError.badRequest(validation.message))

            }
            let fileName = uuid.v4() + `.jpg`;
            img.mv(path.resolve(__dirname,'..','Static',fileName));
            const device = await Device.create({name,price,brandId,typeId,image: fileName}).catch((error) => 
            {            
                next(ApiError.internal(error.message));
            });


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


            let validation = validateDevice(typeId,
                brandId,
                name,
                price,
                "",
                info);
            if(validation.status)
            {
                return next(ApiError.badRequest(validation.message))
            }
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
            next(ApiError.internal(error.message));
        }
    }

    async getAllList(request,response,next)
    {
        try
        {
        let {brandId,typeId,limit,sendRating,page} = request.query;

        page = page || 1;
        limit = limit || 9;
        sendRating[0] = sendRating[0] || 0;
        sendRating[1] = sendRating[1] || 5;

        let offset = page * limit - limit;
        let devices= 
        {
            rows: [],
            count: 0
        };

        let queryConstruct = "";
  
        if(brandId && !typeId)
        {
            queryConstruct = `and "brandId" = ${brandId}`;
        }
        else if(!brandId && typeId)
        {
            queryConstruct = `and "typeId" = ${typeId}`;
        }
        else if(brandId && typeId)
        {
            queryConstruct = `and "brandId" = ${brandId} and "typeId" = ${typeId}`;
        }
        
        const query = 
        `Select Count(*), id, name,price,image,"createdAt","updatedAt","typeId","brandId", average
            from 
                (SELECT devices.Id, devices.name,devices.price,devices.image,devices."createdAt",devices."updatedAt","typeId",
            "brandId", AVG(rate) as average 
            FROM 
                devices left outer join ratings on devices.id = "deviceId" 
            group by (devices.Id, devices.name,devices.price,devices.image,devices."createdAt",devices."updatedAt","typeId","brandId")
            having  (AVG(rate) >= ${sendRating[0]} and AVG(rate) <= ${sendRating[1]} or AVG(rate) is null) ${queryConstruct} LIMIT '${limit}' OFFSET ${offset}) tableA
        group by (id, name,price,image,"createdAt","updatedAt","typeId",
        "brandId", average)`
        
      
            devices.rows = await Device.sequelize.query(query, { type: QueryTypes.SELECT });
            if(devices.rows.length > 0)
                devices.count = devices.rows[0].count;
                return response.json(devices);

        }
        catch (error)
        {
            next(ApiError.internal(error.message));
        }
    }

    async getOne(request,response,next)
    {
        const {id} = request.params;
        const device = await Device.findOne(
            {
                where:{id},
                include : [{model: DeviceInfo,as: 'info'}]
            }
        ).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        })
        
        return response.json(device);
    }

    async delete(request,response)
    {
        const {id} = request.params;
        const device = await Device.destroy(
            {
                where:{id}
            }
        ).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        })
        
        return response.json(device);
    }
}

module.exports = new DeviceController();