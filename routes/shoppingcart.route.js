const express = require('express');
const router = express.Router();
const shoppingcartController = require('../controllers/shoppingcart.controller');

router.get('/', shoppingcartController.genrateUniqueId);
router.post('/',shoppingcartController.addProductInCart);

module.exports = router;
