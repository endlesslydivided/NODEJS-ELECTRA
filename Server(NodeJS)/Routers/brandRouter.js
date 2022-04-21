const Router = require('express');
const brandController = require('../Controllers/brandController');
const router = new Router();


router.post('/',brandController.create)
router.get('/',brandController.getAllList)
router.get('/all',brandController.getAll)
router.delete('/:id',brandController.delete)
router.get('/:id',brandController.getOne)


module.exports = router;