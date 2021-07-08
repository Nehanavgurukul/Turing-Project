const routers = require("./routes/paths");
const express = require("express");
const app = express();
require("dotenv").config()
const MY_PORT = process.env.PORT

app.use(express.json())

app.use(routers)
app.listen(MY_PORT,()=> {
    console.log(`server is running on ${MY_PORT}`)
});






