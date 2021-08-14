const department_services = require("../controllers/departments.controller");

module.exports = (knex, department) => {
    department.get("/department", (req, res) => {
        department_services.departmentGetData(knex)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.send(err)
            })
    }),
        department.get("/department/:department_id", (req, res) => {
            department_services.departmentGetDataById(knex, req)
                .then((data) => {
                    if (data.length != 0) {
                        let a = data[0]
                        res.send(a)
                    } else {
                        res.status(401).json({
                            "error": {
                                "status": 400,
                                "code": "DEP_02",
                                "message": "Don'exist department with this ID.",
                                "field": "department_id"
                            }
                        })
                    }
                })
                .catch(() => {
                    res.status(500).json({
                        message: 'Internal Server Error',
                        status: 500
                    })
                })
        })
}