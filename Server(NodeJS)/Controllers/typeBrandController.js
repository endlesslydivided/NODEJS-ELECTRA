const {TypeBrand} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeBrandController
{
    async create(request,response)
    {
        const {typeId,brandId} = request.body;
        const typeBrand = await TypeBrand.create({typeId,brandId});
        return response.json(typeBrand);
    }

    async getAll(request,response)
    {
        const typeBrand = await TypeBrand.findAll();
        return response.json(typeBrand);
    }



    async getOne(request,response)
    {
        const {id} = request.params;
        const typeBrand = await TypeBrand.findOne(
            {
                where:{id}
            }
        )
        
        return response.json(typeBrand);
    }

    async delete(request,response)
    {
        const {id} = request.params;
        const typeBrand = await TypeBrand.destroy(
            {
                where:{id}
            }
        )
        
        return response.json(typeBrand);
    }

}

module.exports = new TypeBrandController();