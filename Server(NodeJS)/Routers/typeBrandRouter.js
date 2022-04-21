const Router = require('express');
const typeBrandController = require('../Controllers/typeBrandController');
const router = new Router();


router.post('/',typeBrandController.create)
router.delete('/',typeBrandController.delete)
router.get('/',typeBrandController.getAll)
router.get('/:id',typeBrandController.getOne)


module.exports = router;