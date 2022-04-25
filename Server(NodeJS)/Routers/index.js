const Router = require('express');
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const basketDeviceRouter = require('./basketDeviceRouter')
const ratingRouter = require('./ratingRouter')
const chatRouter = require('./chatRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basketdevice', basketDeviceRouter)
router.use('/rating', ratingRouter)
router.use('/chat', chatRouter)

module.exports = router