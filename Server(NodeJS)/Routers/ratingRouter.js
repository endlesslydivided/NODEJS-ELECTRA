const Router = require('express');
const ratingController = require('../Controllers/ratingController');
const router = new Router();
const authMiddleware = require("../Middleware/AuthMiddleware")
const checkRole = require("../Middleware/CheckRoleMiddleware")

router.post('/',authMiddleware, ratingController.create)
router.get('/',checkRole('ADMIN'),ratingController.getAllList)
router.get('/all',ratingController.getAll)
router.delete('/:id',checkRole('ADMIN'),ratingController.delete)
router.get('/:id',ratingController.getOne)
router.get('/:deviceId/all',ratingController.getAllByDevice)


module.exports = router;