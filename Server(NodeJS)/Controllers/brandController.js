const {Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController
{
    async create(request,response)
    {
        const {name} = request.body;
        const brand = await Brand.create({name});
        return response.json(brand);
    }

    async getAllList(request,response)
    {
        
        let {limit,page} = request.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let brands;

        brands  = await Brand.findAndCountAll({limit,offset});
        return response.json(brands);
        
    }

    async getAll(request,response)
    {
        const brands  = await Brand.findAll();
        return response.json(brands);
    }

    async delete(request,response)
    {
        const {id} = request.params;
        const brand = await Brand.destroy(
            {
                where:{id}
            }
        )
        
        return response.json(brand);
    }

    async getOne(request,response)
    {
        const {id} = request.params;
        const brand = await Brand.findOne(
            {
                where:{id}
            }
        )
        
        return response.json(brand);
    }
    
}

module.exports = new BrandController();