const Router = require('express');
const router = new Router();
const shopperRouter = require('./shopperRouter.js');
const shopperSharedInfoRouter = require('./shopperSharedInfoRouter.js');
const buyerRouter = require('./buyerRouter.js');
const orderRouter = require('./orderRouter.js');
const shopOwnerController = require('./shopOwnerRouter.js');
const inviteRouter = require('./inviteRouter.js');

router.use('/shoppers', shopperRouter);
router.use('/shopper-shared-infos', shopperSharedInfoRouter);
router.use('/buyers', buyerRouter);
router.use('/orders', orderRouter);
router.use('/shop-owners', shopOwnerController);
router.use('/invites', inviteRouter);

module.exports = router;
