const Router = require('express');
const chatRoomController = require('../Controllers/chatRoomController');
const router = new Router();

router.get('/',chatRoomController.getAllList)
router.get('/:id',chatRoomController.getOne)



module.exports = router;