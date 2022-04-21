const Router = require('express');
const basketDeviceController = require('../Controllers/basketDeviceController');
const router = new Router();


router.post('/',basketDeviceController.create)
router.delete('/',basketDeviceController.delete)
router.get('/',basketDeviceController.getAll)
router.get('/:id',basketDeviceController.getOne)


module.exports = router;