const Router = require('express');
const basketDeviceController = require('../Controllers/basketDeviceController');
const router = new Router();
const authMiddleware = require("../Middleware/AuthMiddleware")
const checkRole = require("../Middleware/CheckRoleMiddleware")

router.post('/',checkRole('USER'),basketDeviceController.create)
router.delete('/',checkRole('USER'),basketDeviceController.delete)
router.get('/all',checkRole('ADMIN'),basketDeviceController.getAll)
router.get('/',checkRole('ADMIN'),basketDeviceController.getAllList)
router.get('/:id',checkRole('ADMIN'),basketDeviceController.getOne)
router.get('/:id/all',checkRole('USER'),basketDeviceController.getAllByUser)
router.get('/:id/list',checkRole('USER'),basketDeviceController.getAllListByUser)


module.exports = router;