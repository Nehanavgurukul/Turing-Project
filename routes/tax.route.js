const express = require("express");
const router = express.Router();
const taxController = require('../controllers/tax.controller');

router.get('/',taxController.getTaxes);
router.get('/:tax_id',taxController.getTaxByTaxId);

module.exports = router;