let productsServices = {}

productsServices.getAllProducts = ((knex) => {
    return knex("*").from("product")
    .then((data) => {
        return data;
    })
    .catch((err) => {
        console.log(err)
    })
})

productsServices.getProductById = ((knex, req)=>{
    return knex("*").from("product")
    .where("product_id",req.params.product_id)
    .then((data) => {
        return data
    })
    .catch((err) => {
        return err
    })
})


productsServices.getDataFromCatigory =((knex,req) => {
    return knex("*").from("product")
        .rightOuterJoin('product_category', 'product.product_id', 'product_category.category_id')
        .where("category_id", req.params.category_id)
        .then((data) => {
            console.log(data)
            return data;
        })
        .catch((err) => {
            console.log(err)
            return err;
        })
})

module.exports = productsServices;