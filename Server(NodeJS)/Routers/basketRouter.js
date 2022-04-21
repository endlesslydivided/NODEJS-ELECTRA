const Router = require('express');
const basketController = require('../Controllers/basketController');
const router = new Router();


router.post('/',basketController.create)
router.get('/',basketController.getAll)
router.get('/:id',basketController.getOne)


module.exports = router;