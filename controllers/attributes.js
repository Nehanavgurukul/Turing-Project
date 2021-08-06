
const Attributes = {}


//for getting data form attributes table
Attributes.getAttributes = ((knex) => {
    return knex("*").from("attribute")
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
})


//for getting data by attribute id
Attributes.getAttributes_By_Id = ((knex, req) => {
    return knex("*").from("attribute")
        .where("attribute_id", req.params.attribute_id)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
})


//for getting data from attributevalue table by attribute id
Attributes.getDataFromAttributeValue = ((knex, req) => {
    return knex.select("attribute_value_id", "value")
        .from("attribute_value")
        .where("attribute_id", req.params.attribute_id)
        .then(
            data => {
                return data
            }
        ).catch(
            err => {
                return err;
            }
        )
})


// Getting data from all attributes by product id
Attributes.getDataFromAllAttributesByProduct_id = ((knex, req) => {
    return knex.from("product_attribute")
        .innerJoin("attribute_value", "product_attribute.attribute_value_id", "attribute_value.attribute_value_id")
        .innerJoin('attribute', 'attribute_value.attribute_id', 'attribute.attribute_id')
        .select('attribute_value.attribute_value_id', 'attribute_value.value', 'attribute.name')
        .where('product_id', req.params.product_id)
        .then(data => {
            return data
        })
        .catch(err => {
            return err;
        });
})

module.exports = Attributes;









