const express = require('express');
const router = express.Router();

const customerRoute = require('./customer');
const orderRoute = require('./order.routes');

router.use('/customer', customerRoute);
router.use('/customer/login',customerRoute);
router.use('/customer',customerRoute);
router.use('/update/customer/details',customerRoute);
router.use('/update/customer/address',customerRoute);
router.use('/update/customer/credit_card',customerRoute);
router.use('/create/order',orderRoute);
router.use('/order/byId', orderRoute);
router.use('/order/bycustomer_id',orderRoute);
router.use('/sortDetails/byOrder_id',orderRoute);

module.exports = router;