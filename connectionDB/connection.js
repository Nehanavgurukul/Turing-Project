const mysql = require("mysql");
require("dotenv").config();


const knex = require('knex')({
    client : "mysql",
    connection : ({
        host : process.env.DATABASE_HOST,
        user : "root",
        password : process.env.PASSWORD,
        database : process.env.DATABASE
    })
})
console.log("db connection successfully !")


module.exports = knex;

