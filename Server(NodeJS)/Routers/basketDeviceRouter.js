const Router = require('express');
const basketDeviceController = require('../Controllers/basketDeviceController');
const router = new Router();


router.post('/',basketDeviceController.create)
router.delete('/',basketDeviceController.delete)
router.get('/all',basketDeviceController.getAll)
router.get('/',basketDeviceController.getAllList)
router.get('/:id',basketDeviceController.getOne)
router.get('/:id/all',basketDeviceController.getAllByUser)
router.get('/:id/list',basketDeviceController.getAllListByUser)


module.exports = router;