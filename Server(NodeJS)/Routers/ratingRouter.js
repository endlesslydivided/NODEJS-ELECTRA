const Router = require('express');
const ratingController = require('../Controllers/ratingController');
const router = new Router();


router.post('/',ratingController.create)
router.get('/',ratingController.getAllList)
router.get('/all',ratingController.getAll)
router.delete('/:id',ratingController.delete)
router.get('/:id',ratingController.getOne)


module.exports = router;