const attributesData = require("../controllers/attributes")

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

    attributes.get("/attribue/:attribute_id",(req,res) => {
        attributesData.getAttributes_By_Id(knex,req)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    })
}