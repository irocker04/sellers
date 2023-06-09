const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController.js')

router.get('/', orderController.getAll)
router.post('/', orderController.create)
router.get('/:id', orderController.getOne)
router.patch('/:id', orderController.update)
router.delete('/:id', orderController.delete)

module.exports = router
