const attributesData = require("../controllers/attributes.controller")

module.exports = (knex, attributes) => {
    attributes.get("/attributes", (req, res) => {
        attributesData.getAttributes(knex)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    }),

        attributes.get("/attribute/:attribute_id", (req, res) => {
            attributesData.getAttributes_By_Id(knex, req)
                .then((data) => {
                    res.send(data[0])
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        ,
        attributes.get("/attribute/value/:attribute_id", (req, res) => {
            attributesData.getDataFromAttributeValue(knex, req)
                .then((data) => {
                    res.send(data)
                })
                .catch((err) => {
                    res.send(err)
                })
        }),

        attributes.get("/attribute/inProduct/:product_id", (req, res) => {
            attributesData.getDataFromAllAttributesByProduct_id(knex, req)
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((err) =>{
                res.send(err);
            })
        })
}