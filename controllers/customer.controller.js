let customerServices = {}

customerServices.postCustomer = ((knex, req) => {
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    if (name === undefined || email === undefined || password === undefined) {
        return "name, email and password are require ...";
    } else {
        return knex().from("customer")
            .where("email", email)
            .then((data) => {
                if (data.length < 1) {
                    return knex("customer").insert(req.body)
                        .then(() => {
                            return knex().from("customer").where("email", email)
                                .then((data) => {
                                    let token = jwt.sign({"email" : email},"secretkey")
                                    console.log(token)
                                    let userDetails = {"custome" : data[0], "accessToken" : token , expire_in : "24h"}
                                    console.log(userDetails)
                                    return userDetails;
                                })
                                .catch((err) => {
                                    return err;
                                })
                        })
                        .catch((err) => {
                            return err;
                        })
                } else {
                    return "user already exists ..";
                }
            })
            .catch((err) => {
                return err;
            })
    }
})

module.exports = customerServices;