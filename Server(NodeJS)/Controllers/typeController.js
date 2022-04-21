const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController
{
    async create(request,response)
    {
        const {name} = request.body;
        const type = await Type.create({name});
        return response.json(type);
    }

    async getAllList(request,response)
    {
        let {limit,page} = request.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let types;

        types  = await Type.findAndCountAll({limit,offset});
        return response.json(types);
    }

    async getAll(request,response)
    {
        const types  = await Type.findAll();
        return response.json(types);
    }

    async delete(request,response)
    {
        const {id} = request.params;
        const type = await Type.destroy(
            {
                where:{id}
            }
        )
        
        return response.json(type);
    }

    async getOne(request,response)
    {
        const {id} = request.params;
        const type = await Type.findOne(
            {
                where:{id}
            }
        )
        
        return response.json(type);
    }
}


module.exports = new TypeController();