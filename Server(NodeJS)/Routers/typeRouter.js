const Router = require('express');
const typeController = require('../Controllers/typeController');
const router = new Router();
const checkRole = require("../Middleware/CheckRoleMiddleware")

router.post('/',checkRole('ADMIN'),typeController.create)
router.get('/',typeController.getAllList)
router.get('/all',typeController.getAll)
router.delete('/:id',typeController.delete)
router.get('/:id',typeController.getOne)


module.exports = router;