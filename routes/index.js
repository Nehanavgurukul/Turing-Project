const express = require('express');
const { route } = require('./customer');
const router = express.Router();

const customerRoute = require('./customer');
const orderRoute = require('./order.routes');
const shoppingcartdRoute = require('./shoppingcart.route');
const taxRoute = require('./tax.route');
const shippingRoute = require('./shipping.route');

router.use('/customer', customerRoute);
router.use('/customerlogin', customerRoute);
router.use('/customer', customerRoute);
router.use('/update/customer/details', customerRoute);
router.use('/update/customer/address', customerRoute);
router.use('/update/customer/credit_card', customerRoute);
router.use('/create/order', orderRoute);
router.use('/order/byId', orderRoute);
router.use('/order/bycustomer_id', orderRoute);
router.use('/sortDetails/byOrder_id', orderRoute);
router.use('/genratedUniqueId', shoppingcartdRoute);
router.use('/add/productInShoppingCart', shoppingcartdRoute);
router.use('/getshoppingcart/by/cart_id', shoppingcartdRoute);
router.use('/updatecartbyitem_id', shoppingcartdRoute);
router.use('/deletecartbyid', shoppingcartdRoute);
router.use('/movetocart', shoppingcartdRoute);
router.use('/totalamount/bycartid', shoppingcartdRoute);
router.use('/gettax',taxRoute);
router.use('/gettaxbytaxid',taxRoute);
router.use('/shipping/regions',shippingRoute);
router.use('/shipping/region/shipping_region_id',shippingRoute);

module.exports = router;