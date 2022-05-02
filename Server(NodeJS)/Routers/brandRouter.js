const Router = require('express');
const brandController = require('../Controllers/brandController');
const router = new Router();
const authMiddleware = require("../Middleware/AuthMiddleware")
const checkRole = require("../Middleware/CheckRoleMiddleware")


router.post('/',checkRole('ADMIN'),brandController.create)
router.get('/',brandController.getAllList)
router.get('/all',brandController.getAll)
router.delete('/:id',checkRole('ADMIN'),brandController.delete)
router.get('/:id',brandController.getOne)


module.exports = router;