const department_services = require("../controllers/departments");

module.exports = (knex, department) => {
    department.get("/department", (req, res) => {
        department_services.departmentGetData(knex)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    }),
        department.get("/department/:department_id", (req, res) => {
            department_services.departmentGetDataById(knex, req)
                .then((data) => {
                    res.send(data)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
}