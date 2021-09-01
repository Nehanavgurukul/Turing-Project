const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orders.controller');

router.post('/:id',orderController.createOrders);
router.get('/:order_id',orderController.getOrdersByOrderId);
router.get('/:customer_id',orderController.getOrderByCustomer);
router.get('/:order_id',orderController.getSortDetialsByOrderId);

module.exports = router;