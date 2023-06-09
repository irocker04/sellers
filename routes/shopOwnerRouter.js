const Router = require('express')
const router = new Router()
const shopOwnerController = require('../controllers/shopOwnerController.js')

router.get('/', shopOwnerController.getAll)
router.post('/', shopOwnerController.create)
router.get('/:id', shopOwnerController.getOne)
router.patch('/:id', shopOwnerController.update)
router.delete('/:id', shopOwnerController.delete)

module.exports = router
