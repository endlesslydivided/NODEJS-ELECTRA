const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController
{
    async create(request,response,next)
    {
        const {name} = request.body;
        
        if(name === "")
        {
            return next(ApiError.badRequest(validation.message))
        }

        const type = await Type.findOne(
            {
                where:{name}
            }
        )
        if( type !== null)
        {
            return next(ApiError.badRequest("Такой тип уже существует"))
        }

        type = await Type.create({name}).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(type);
    }

    async getAllList(request,response,next)
    {
        let {limit,page} = request.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let types;

        types  = await Type.findAndCountAll({limit,offset}).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(types);
    }

    async getAll(request,response,next)
    {
        const types  = await Type.findAll().catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(types);
    }

    async delete(request,response,next)
    {
        const {id} = request.params;
        const type = await Type.destroy(
            {
                where:{id}
            }
        ).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        
        return response.json(type);
    }

    async getOne(request,response,next)
    {
        const {id} = request.params;
        const type = await Type.findOne(
            {
                where:{id}
            }
        ).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        
        return response.json(type);
    }
}


module.exports = new TypeController();