const { Rating, Device } = require("../models/models");
const ApiError = require("../error/ApiError");

function updateOrCreate(model, where, newItem) {
  // First try to find the record
  return model.findOne({ where: where }).then(function (foundItem) {
    if (!foundItem) {
      // Item not found, create a new one
      return model.create(newItem).then(function (item) {
        return { item: item, created: true };
      });
    }
    // Found an item, update it
    return model.update(newItem, { where: where }).then(function (item) {
      return { item: item, created: false };
    });
  });
}

class RatingController {
  async create(request, response, next) {
    try {
      const { userId, deviceId, rate } = request.body;

      updateOrCreate(
        Rating,
        { userId: userId, deviceId: deviceId },
        { userId, deviceId, rate }
      )
        .then(function (rating) {
          return response.json(rating);
        })
        
    } catch (error) {
      return next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getAll(request, response, next) {
    try {
      const ratings = await Rating.findAll()
      return response.json(ratings);
    } catch (error) {
      return next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getAllByDevice(request, response, next) {
    try {
      let { deviceId } = request.params;

      const ratings = await Rating.findAll({
        where: { deviceId },
        include: [{ model: Device, as: "device" }],
      })
      return response.json(ratings);
    } catch (error) {
      return next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getAllList(request, response, next) {
    try {
      let { limit, page } = request.query;

      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let ratings;

      ratings = await Rating.findAndCountAll({ limit, offset });
      return response.json(ratings);
    } catch (error) {
      return next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getOne(request, response, next) {
    try {
      const { id } = request.params;
      const rating = await Rating.findOne({
        where: { id },
      });

      return response.json(rating);
    } catch (error) {
      return next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async delete(request, response, next) {
    try {
      const { id } = request.params;
      const rating = await Rating.destroy({
        where: { id },
      });

      return response.json(rating);
    } catch (error) {
      return next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }
}

module.exports = new RatingController();
