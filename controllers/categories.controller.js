const categoriesServices = {}

// get all categories
categoriesServices.categoriesGetData = ((knex) => {

    return knex("*").from("category")
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
})


// get category by category_id
categoriesServices.categoriesGetDataById = ((knex, req) => {
    return knex("*").from("category").where("category_id", req.params.category_id)
        .then((data) => {
            console.log(data)
            return data;
        })
        .catch((err) => {
            console.log(err)
            return err;
        })
})


// get product by id .....
categoriesServices.categories_inProduct_GetData_By_Id = ((knex, req) => {
    return knex("*").from("category")
        .select("category.category_id", "category.department_id","category.name")
        .rightOuterJoin('product_category', 'category.category_id', 'product_category.category_id')
        .where("product_id", req.params.product_id)
        .then((data) => {
            console.log(data)
            return data;
        })
        .catch((err) => {
            console.log(err)
            return err;
        })
})

categoriesServices.categories_inDepartment_department_id = ((knex, req) => {
    return knex("*").from("category")
        .where("department_id", req.params.department_id)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
})


module.exports = categoriesServices;