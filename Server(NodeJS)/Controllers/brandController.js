const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(request, response, next) {
    try {
      const { name } = request.body;

      if (name === "") {
        return next(ApiError.badRequest(validation.message));
      }
      let brand = await Brand.findOne({
        where: { name },
      });
      if (brand !== null) {
        return next(ApiError.badRequest("Такой бренд уже существует"));
      }
      brand = await Brand.create({ name })
      return response.json(brand);
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
      let brands;

      brands = await Brand.findAndCountAll({ limit, offset })
      return response.json(brands);
    } catch (error) {
      return next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getAll(request, response, next) {
    try {
      const brands = await Brand.findAll();
      return response.json(brands);
    } catch (error) {
      return next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async delete(request, response, next) {
    try {
      const { id } = request.params;
      const brand = await Brand.destroy({
        where: { id },
      })

      return response.json(brand);
    } catch (error) {
      return next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }

  async getOne(request, response, next) {
    try {
      const { id } = request.params;
      const brand = await Brand.findOne({
        where: { id },
      })

      return response.json(brand);
    } catch (error) {
      return next(ApiError.internal("Ошибка на стороне сервера"));
    }
  }
}

module.exports = new BrandController();
