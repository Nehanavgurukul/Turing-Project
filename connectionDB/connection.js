const mysql = require("mysql");

const knex = require('knex')({
    client : "mysql",
    connection : ({
        host : "localhost",
        user : "root",
        password : "Neha@1234",
        database : "tshirtshop"
    })
});

console.log("connection created..")
module.exports = knex;

