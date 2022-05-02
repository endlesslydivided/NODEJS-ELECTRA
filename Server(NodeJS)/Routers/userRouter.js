const Router = require('express');
const userController = require('../Controllers/userController');
const router = new Router();
const authMiddleware = require("../Middleware/AuthMiddleware")
const checkRole = require("../Middleware/CheckRoleMiddleware")

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddleware,userController.check)
router.get('/',checkRole('ADMIN'),userController.getAllList)

module.exports = router;