const express =require("express");
const router = express.Router();
const knex = require("../database/connection");
const jwt = require("jsonwebtoken");

require("../controllers/departments")(knex,router);
require("../controllers/categories")(knex,router);

module.exports = router; 
