let productsServices = {}

productsServices.getAllProducts = ((knex) => {
    return knex("*").from("product")
        .select("product_id", "name", "description", "price", "discounted_price", "thumbnail")
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err)
        })
})


productsServices.getProductById = ((knex, req) => {
    return knex("*").from("product")
        .where("product_id", req.params.product_id)
        .then((data) => {
            return data
        })
        .catch((err) => {
            return err
        })
})


productsServices.getDataFromCatigory = ((knex, req) => {
    return knex().from("product")
        .select("product.product_id", "product.name", "product.description", "discounted_price", "product.thumbnail")
        .innerJoin('product_category', 'product.product_id', 'product_category.product_id')
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


productsServices.getDataFromDepartment = ((knex, req) => {
    return knex().from("product")
        .select("product.product_id", "product.name", "product.description", "product.discounted_price", "product.thumbnail")
        .innerJoin("product_category", "product.product_id", "product_category.product_id")
        .innerJoin("category", "product_category.category_id", "category.category_id")
        .where("department_id", req.params.department_id)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
})

productsServices.getProductDetail = ((knex, req) => {
    return knex("*").from("product")
        .select("product.product_id", "product.name", "product.description", "product.price", "product.discounted_price", "product.image", "product.image_2")
        .where("product_id", req.params.product_id)
        .then((data) => {
            return data
        })
        .catch((err) => {
            return err
        })
})

productsServices.getProductLocation = ((knex, req) => {
    return knex().from("product_category")
        .select('category.category_id', "category.name as category_name", "department.department_id", "department.name as department_name")
        .rightOuterJoin("category", "product_category.category_id", "category.category_id")
        .rightOuterJoin("department", "category.department_id", "department.department_id")
        .where("product_id", req.params.product_id)
        .then((data) => {
            return data
        })
        .catch((err) => {
            return err
        })
})


// productsServices.getProductReview = ((knex, req) => {
//     return knex().from("review")
//         .rightOuterJoin("product","review.product_id","product.product_id")
//         .where("product_id", req.params.product_id)
//         .then((data) => {
//             return data
//         })
//         .catch((err) => {
//             return err
//         })
// })




module.exports = productsServices;