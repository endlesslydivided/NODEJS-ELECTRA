const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async create(request, response, next) {
    try {
      const { name } = request.body;

      if (name === "") {
        return next(ApiError.badRequest(validation.message));
      }

      let type = await Type.findOne({
        where: { name },
      });
      if (type !== null) {
        return next(ApiError.badRequest("Такой тип уже существует"));
      }

      type = await Type.create({ name }).catch((error) => {
        next(ApiError.internal(error.message));
      });
      return response.json(type);
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
      let types;

      types = await Type.findAndCountAll({ limit, offset }).catch((error) => {
        next(ApiError.internal(error.message));
      });
      return response.json(types);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getAll(request, response, next) {
    try {
      const types = await Type.findAll().catch((error) => {
        next(ApiError.internal(error.message));
      });
      return response.json(types);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async delete(request, response, next) {
    try {
      const { id } = request.params;
      const type = await Type.destroy({
        where: { id },
      }).catch((error) => {
        next(ApiError.internal(error.message));
      });

      return response.json(type);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getOne(request, response, next) {
    try {
      const { id } = request.params;
      const type = await Type.findOne({
        where: { id },
      }).catch((error) => {
        next(ApiError.internal(error.message));
      });

      return response.json(type);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }
}

module.exports = new TypeController();
