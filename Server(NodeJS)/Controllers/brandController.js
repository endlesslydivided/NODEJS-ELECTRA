const {Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController
{
    async create(request,response,next)
    {
        const {name} = request.body;
        
        if(name === "")
        {
            return next(ApiError.badRequest(validation.message))
        }
        const brand = await Type.findOne(
            {
                where:{name}
            }
        )
        if( brand !== null)
        {
            return next(ApiError.badRequest("Такой бренд уже существует"))
        }
        brand = await Brand.create({name}).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(brand);
    }

    async getAllList(request,response,next)
    {
        
        let {limit,page} = request.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let brands;

        brands  = await Brand.findAndCountAll({limit,offset}).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(brands);
        
    }

    async getAll(request,response,next)
    {
        const brands  = await Brand.findAll().catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        return response.json(brands);
    }

    async delete(request,response,next)
    {
        const {id} = request.params;
        const brand = await Brand.destroy(
            {
                where:{id}
            }
        ).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        
        return response.json(brand);
    }

    async getOne(request,response,next)
    {
        const {id} = request.params;
        const brand = await Brand.findOne(
            {
                where:{id}
            }
        ).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        
        return response.json(brand);
    }
    
}

module.exports = new BrandController();