const Router = require('express')
const deviceController = require('../Controllers/deviceController')
const ApiError = require('../error/ApiError')
const router = new Router()
const authMiddleware = require("../Middleware/AuthMiddleware")
const checkRole = require("../Middleware/CheckRoleMiddleware")

router.post('/',checkRole('ADMIN'),deviceController.create)
router.get('/',deviceController.getAllList)
router.get('/:id',deviceController.getOne)
router.delete('/:id',checkRole('ADMIN'),deviceController.delete)
router.post('/:id',checkRole('ADMIN'),deviceController.update)


module.exports = router;