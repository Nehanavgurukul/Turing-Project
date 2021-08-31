const customerController = require("../controllers/customer.controller");

const express = require("express");
const router = express.Router();

router.post('/',customerController.customerRegister);
router.get('/',customerController.customerLogin);
router.get('/:customer_id',customerController.getCustomerById);
router.put('/:customer_id', customerController.updateCustomerDetialsById);
router.patch('/:customer_id',customerController.updateAddressById);
router.patch('/:customer_id',customerController.updateCreditCardById);

module.exports = router;