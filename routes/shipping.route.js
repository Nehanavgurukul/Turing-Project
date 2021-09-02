const express = require("express");
const router = express.Router();
const shippingController = require('../controllers/shipping.controller');

router.get('/',shippingController.getShippingRegions);
router.get('/:shipping_region_id',shippingController.getShippingRegionsByShippingRegionsId);

module.exports = router;