const Router = require('express')
const router = new Router()
const shopperSharedInfoController = require('../controllers/shopperSharedInfoController.js')

router.get('/', shopperSharedInfoController.getAll)
router.post('/', shopperSharedInfoController.create)
router.get('/:id', shopperSharedInfoController.getOne)
router.patch('/:id', shopperSharedInfoController.update)
router.delete('/:id', shopperSharedInfoController.delete)

module.exports = router
