const Router = require('express');
const basketController = require('../Controllers/basketController');
const router = new Router();


router.post('/',basketController.create)
router.get('/all',basketController.getAll)
router.get('/:id',basketController.getOne)
router.get('/',basketController.getAllList)


module.exports = router;