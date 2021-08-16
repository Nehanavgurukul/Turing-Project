const express = require("express");
const knex = require("./connectionDB/connection");
const app = express();



require("dotenv").config()
const my_port = process.env.PORT



const router = express.Router();
require("./routes/department")(knex, router);
require("./routes/categories")(knex, router);
require("./routes/attributes")(knex, router);   
require("./routes/products")(knex, router);
require("./routes/customer")(knex, router);



app.use(express.json())
app.use(router)



app.listen(my_port, () => {
    console.log(`server is running on  port no ${my_port}`)
});







