const product_services = require("../controllers/products.controller");

module.exports = (knex, product) => {
    product.get("/products", (req, res) => {
        product_services.getAllProducts(knex)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }),
        product.get("/products/:product_id", (req, res) => {
            product_services.getProductById(knex, req)
                .then((data) => {
                    res.status(200).json(data[0]);
                })
                .catch((err) => {
                    console.log(err)
                    res.send(err)
                })
        }),
        product.get("/products/inCategory/:category_id", (req, res) => {
            product_services.getDataFromCatigory(knex, req)
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((err) => {
                    console.log(err)
                    res.send(err)
                })
        }),
        product.get("/products/inDepartment/:department_id", (req, res) => {
            product_services.getDataFromDepartment(knex, req)
                .then((data) => {
                    res.status(200).send(data)
                })
                .catch((err) => {
                    res.send(err);
                })
        }),
        product.get("/products/:product_id/details", (req, res) => {
            product_services.getProductDetail(knex, req)
                .then((data) => {
                    res.status(200).send(data)
                })
                .catch((err) => {
                    res.send(err);
                })
        }),
        product.get("/products/:product_id/locations", (req, res) => {
            product_services.getProductLocation(knex, req)
                .then((data) => {
                    res.status(200).send(data)
                })
                .catch((err) => {
                    res.send(err);
                })
        })
        // ,
        // product.get("/products/:product_id/reviews",(req, res) => {
        //     product_services.getProductReview(knex, req)
        //     .then((data) => {
        //         res.status(200).send(data)
        //     })
        //     .catch((err) => {
        //         res.send(err);
        //     })
        // })
}

