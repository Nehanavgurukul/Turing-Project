module.exports = (knex,departments) => {

    // get all departments data 
    departments.get("/departments",(req,res) => {
        knex("*").from("department")
        .then((data)=> {
            console.log(data)
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    })

    // get department by department_id
    departments.get("/departments/:department_id",(req,res) => {
        knex("*").from("department").where("department_id",req.params.department_id)
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((err) => {
            console.log(data)
            res.sned(data)
        })
    })
}

