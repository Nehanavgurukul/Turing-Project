const customerController = require("../controllers/customer.controller");

module.exports = (knex, customer) => {
    customer.post("/customers", (req, res) => {
        customerController.postCustomer(knex,req)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.send(err)
        })
    })
}