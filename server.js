const express = require("express");
const knex = require("./connectionDB/connection");
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());


require("dotenv").config()
const my_port = process.env.PORT



const router = express.Router();
require("./routes/department")(knex, router);
require("./routes/categories")(knex, router);
require("./routes/attributes")(knex, router);   
require("./routes/products")(knex, router);



app.use('/', require('./routes'))
app.use(express.json())
app.use(router)



app.listen(my_port, () => {
    console.log(`server is running on  port no ${my_port}`)
});







