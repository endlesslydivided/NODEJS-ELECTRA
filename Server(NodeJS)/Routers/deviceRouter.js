const Router = require('express')
const deviceController = require('../Controllers/deviceController')
const router = new Router()

router.post('/',deviceController.create)
router.get('/',deviceController.getAllList)
router.get('/:id',deviceController.getOne)
router.delete('/:id',deviceController.delete)
router.post('/:id',deviceController.update)


module.exports = router;