const express = require('express');
const router = express.Router();

const customerRoute = require('./customer');

router.use('/customer', customerRoute);
router.use('/customer/login',customerRoute);
router.use('/customer',customerRoute);
router.use('/update/customer/details',customerRoute);
router.use('/update/customer/address',customerRoute);
router.use('/update/customer/credit_card',customerRoute);

module.exports = router;