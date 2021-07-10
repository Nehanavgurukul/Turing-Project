
const Attributes = {}

Attributes.getAttributes = ((knex) => {
    return knex("*").from("attribute")
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
})

Attributes.getAttributes_By_Id = ((knex,req) => {
    return knex("*").from("attribute")
        .where("attribute_id", req.params.attribute_id)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
})


module.exports = Attributes;









