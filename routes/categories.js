var categories_services = require("../controllers/categories")


module.exports = (knex, categories) => {
    categories.get("/categories", (req, res) => {
        categories_services.categoriesGetData(knex)
            .then((data) => {
                console.log(data)
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    }),
        categories.get("/categories/:category_id", (req, res) => {
            categories_services.categoriesGetDataById(knex, req)
                .then((data) => {
                    console.log(data)
                    res.send(data)
                })
                .catch((err) => {
                    res.send(err)
                })
        }),
        categories.get("/categories/inProduct/:product_id", (req, res) => {
            categories_services.categories_inProduct_GetData_By_Id(knex, req)
                .then((data) => {
                    console.log(data)
                    res.send(data)
                })
                .catch((err) => {
                    console.log(err)
                    res.send(err)
                })
        }),
        categories.get("/categories/inDepartment/:department_id", (req, res) => {
            categories_services.categories_inDepartment_department_id(knex, req)
                .then((data) => {
                    res.send(data)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
}


