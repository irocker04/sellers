const Router = require('express')
const router = new Router()
const shopperController = require('../controllers/shopperController.js')

router.get('/', shopperController.getAll)
router.post('/', shopperController.create)
router.get('/:id', shopperController.getOne)
router.patch('/:id', shopperController.update)
router.delete('/:id', shopperController.delete)

module.exports = router
