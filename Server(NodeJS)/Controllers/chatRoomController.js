const ApiError = require('../error/ApiError');
const {ChatRoom} = require('../models/models');


class ChatRoomController
{
    async getAllList(request,response,next)
    {
        
        let {limit,page} = request.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        let chatRooms  = await ChatRoom.findAndCountAll({
            order: [
              ['id', 'ASC']
            ],

            offset: offset,
            limit: limit,
          }).catch((error) => 
          {            
              next(ApiError.internal(error.message));
          });
        
        return response.json(chatRooms);

        
    }

    async getOne(request,response,next)
    {
        const {id} = request.params;
        const chatRoom = await ChatRoom.findOne(
            {
                where:{id}
            }
        ).catch((error) => 
        {            
            next(ApiError.internal(error.message));
        });
        
        return response.json(chatRoom);
    }


}

module.exports = new ChatRoomController();