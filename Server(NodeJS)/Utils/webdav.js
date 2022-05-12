require("dotenv").config();
const { createClient } = require("webdav");
const client = createClient(process.env.REMOTE_URL, {
  username: process.env.USERNAMEWEBDAV,
  password: process.env.PASSWORD,
});
const ApiError = require("../error/ApiError");
const fs = require("fs");

const getFile = async (request, response, next) => {
  const { filename } = request.params;

  const filePath = "/static/images/" + filename;
  await client
    .exists(filePath)
    .then((alreadyExists) => {
      if (alreadyExists) {
        let rs = client.createReadStream(filePath);
        rs.pipe(response);
      } else {
        next(ApiError.notFound("Файл не существует!"));
      }
    })
    .catch((err) => {
      next(ApiError.badRequest("Файл не существует!"));
    });
};

const deleteFile = async (fileName, next) => {
  const filePath = "/static/images/" + fileName;
  await client
    .exists(filePath)
    .then((alreadyExists) => {
      if (alreadyExists) {
        return client.deleteFile(filePath).catch((error) => {
          next(ApiError.internal("Ошибка при удалении файла!"));
        });
      } else {
        next(ApiError.notFound("Файл не существует!"));
      }
    })
    .catch((err) => {
      next(ApiError.internal("Ошибка при удалении файла"));
    });
};

const createFile = async (file, next) => {
  try {
    await client.putFileContents("/static/images/" + file.name, file.data);
  } catch (err) {
    next(ApiError.internal("Не удалось загрузить файл!"));
  }
};

module.exports = { getFile, deleteFile, createFile };
