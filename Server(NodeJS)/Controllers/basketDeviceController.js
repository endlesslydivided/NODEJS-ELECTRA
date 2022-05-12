const { BasketDevice, Device, Brand, Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketDeviceController {
  async create(request, response, next) {
    try {
      const { userId, deviceId } = request.body;
      const basketDevice = await BasketDevice.create({
        userId,
        deviceId,
      }).catch((error) => {
        next(ApiError.internal(error.message));
      });
      return response.json(basketDevice);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getAll(request, response, next) {
    try {
      const basketDevices = await BasketDevice.findAll().catch((error) => {
        next(ApiError.internal(error.message));
      });
      return response.json(basketDevices);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getAllList(request, response, next) {
    try {
      let { limit, page } = request.query;

      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let basketDevices;

      basketDevices = await BasketDevice.findAndCountAll({
        limit,
        offset,
      }).catch((error) => {
        next(ApiError.internal(error.message));
      });
      return response.json(basketDevices);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getAllListByUser(request, response, next) {
    try {
      let { limit, page } = request.query;
      let { id } = request.params;

      page = page || 1;
      limit = limit || 5;
      let offset = page * limit - limit;
      let basketDevices;

      basketDevices = await BasketDevice.findAndCountAll({
        limit,
        offset,
        where: {
          userId: id,
        },
        include: [
          {
            model: Device,
            required: true,
            include: [
              {
                model: Brand,
                required: true,
              },
              {
                model: Type,
                required: true,
              },
            ],
          },
        ],
      })
        .then((data) => {
          return response.json(data);
        })
        .catch((error) => {
          next(ApiError.internal(error.message));
        });
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getAllByUser(request, response, next) {
    try {
      let { id } = request.params;

      let basketDevices = await BasketDevice.findAll({
        where: {
          userId: id,
        },

        include: [{ model: Device, as: "device" }],
      }).catch((error) => {
        next(ApiError.internal(error.message));
      });

      return response.json(basketDevices);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getOne(request, response, next) {
    try {
      const { id } = request.params;
      const basketDevice = await BasketDevice.findOne({
        where: { id },
      }).catch((error) => {
        next(ApiError.internal(error.message));
      });

      return response.json(basketDevice);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async delete(request, response, next) {
    try {
      const { id } = request.params;
      const basketDevice = await BasketDevice.destroy({
        where: { id },
      }).catch((error) => {
        next(ApiError.internal(error.message));
      });

      return response.json(basketDevice);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }
}

module.exports = new BasketDeviceController();
