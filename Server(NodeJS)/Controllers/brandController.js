const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(request, response, next) {
    try {
      const { name } = request.body;

      if (name === "") {
        return next(ApiError.badRequest(validation.message));
      }
      const brand = await Brand.findOne({
        where: { name },
      });
      if (brand !== null) {
        return next(ApiError.badRequest("Такой бренд уже существует"));
      }
      brand = await Brand.create({ name }).catch((error) => {
        next(ApiError.internal(error.message));
      });
      return response.json(brand);
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
      let brands;

      brands = await Brand.findAndCountAll({ limit, offset }).catch((error) => {
        next(ApiError.internal(error.message));
      });
      return response.json(brands);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getAll(request, response, next) {
    try {
      const brands = await Brand.findAll().catch((error) => {
        next(ApiError.internal(error.message));
      });
      return response.json(brands);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async delete(request, response, next) {
    try {
      const { id } = request.params;
      const brand = await Brand.destroy({
        where: { id },
      }).catch((error) => {
        next(ApiError.internal(error.message));
      });

      return response.json(brand);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getOne(request, response, next) {
    try {
      const { id } = request.params;
      const brand = await Brand.findOne({
        where: { id },
      }).catch((error) => {
        next(ApiError.internal(error.message));
      });

      return response.json(brand);
    } catch (error) {
      next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }
}

module.exports = new BrandController();
