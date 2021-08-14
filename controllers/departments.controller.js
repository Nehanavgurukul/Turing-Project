const departmentServices = {}

departmentServices.departmentGetData = ((knex) => {
    return knex("*").from("department")
        .then((data) => {
            console.log(data)
            return data;
        })
        .catch((err) => {
            console.log(err)
            return err;
        })
})

departmentServices.departmentGetDataById = ((knex, req) => {
    return knex("*").from("department").where("department_id", req.params.department_id)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
})

module.exports = departmentServices;



