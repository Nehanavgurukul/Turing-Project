const product_services = require("../controllers/products");

module.exports = (knex, product) => {
    product.get("/products", (req, res) => {
        product_services.getAllProducts(knex)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }),
        product.get("/products/:product_id", (req, res) => {
            product_services.getProductById(knex, req)
                .then((data) => {
                    res.send(data)
                })
                .catch((err) => {
                    console.log(err)
                    res.send(err)
                })
        }),
        product.get("/products/inCategory/:category_id", (req, res) => {
            product_services.getDataFromCatigory(knex, req)
                .then((data) => {
                    res.send(data)
                })
                .catch((err) => {
                    console.log(err)
                    res.send(err)
                })
        })
}

