const express = require('express');
const router = express.Router();
const shoppingcartController = require('../controllers/shoppingcart.controller');

router.get('/', shoppingcartController.genrateUniqueId);
router.post('/', shoppingcartController.addProductInCart);
router.get('/:cart_id', shoppingcartController.getShoppingCartById);
router.put('/:item_id',shoppingcartController.updateCartByItem);
router.delete('/:cart_id',shoppingcartController.deleteCartByCart_Id);
router.get('/:item_id',shoppingcartController.moveProductToCart);
router.get('/:cart_id',shoppingcartController.getTotalAmountByCartId);

module.exports = router;
