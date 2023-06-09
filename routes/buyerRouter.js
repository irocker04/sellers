const Router = require('express')
const router = new Router()
const buyerController = require('../controllers/buyerController.js')

router.get('/', buyerController.getAll)
router.post('/', buyerController.create)
router.get('/:id', buyerController.getOne)
router.patch('/:id', buyerController.update)
router.delete('/:id', buyerController.delete)

module.exports = router
