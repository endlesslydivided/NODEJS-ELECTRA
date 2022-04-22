const Router = require('express');
const userController = require('../Controllers/userController');
const router = new Router();
const authMiddleware = require("../Middleware/AuthMiddleware")

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddleware,userController.check)
router.get('/',userController.getAllList)

module.exports = router;