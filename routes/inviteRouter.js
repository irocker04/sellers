const Router = require('express')
const router = new Router()
const inviteController = require('../controllers/inviteController.js')

router.get('/', inviteController.getAll)
router.post('/', inviteController.create)
router.get('/:id', inviteController.getOne)
router.patch('/:id', inviteController.update)
router.delete('/:id', inviteController.delete)

module.exports = router
