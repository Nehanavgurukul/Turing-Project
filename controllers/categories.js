

module.exports = (knex,categories) => {

    // create api for get category
    categories.get("/categories",(req,res) => {
        knex("*").from("category")
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    })


    // get category by category_id
    categories.get("/categories/:category_id",(req,res) => {
        knex("*").from("category").where("category_id",req.params.category_id)
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    })

    categories.get("/categories/inProduct/:product_id",(req,res) => {
        knex("*").from("category")
        .rightOuterJoin('product_category', 'category.category_id', 'product_category.category_id')
        .where("product_id",req.params.product_id)
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    })
}