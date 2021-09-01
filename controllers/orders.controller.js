const knex = require("../connectionDB/connection");


const createOrders = async (req, res) => {
    let id = req.params.id
    let customer_id = req.body.customer_id
    let shipping_id = req.body.shipping_id
    let tax_id = req.body.tax_id

    try {
        let result = await knex.from('product').select('product.product_id', 'attribute_value.value', 'product.name', 'product.price', 'product.discounted_price')
            .join('product_attribute', 'product_attribute.product_id', '=', 'product.product_id')
            .join('attribute_value', 'attribute_value.attribute_value_id', '=', 'product_attribute.attribute_value_id')
            .where('product.product_id', id)

        await knex('orders').insert({
            "total_amount": result[0].price * result[0].price,
            "created_on": new Date(),
            "customer_id": customer_id,
            "shipping_id": shipping_id,
            "tax_id": tax_id
        })

        var userData = { order_id: result[0]['product_id'], product_id: result[0]['product_id'], attributes: result[0]['value'], product_name: result[0]['name'], quantity: result[0]['price'], unit_cost: result[0]['price'] + result[0]['discounted_price'] }
        knex.from('order_detail').insert(userData).then(() => {
            return res.status(200).json({
                Message: "Created Orders Sucessfully!!!",
                status: 200
            })
        })
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal server error!',
            error: err
        })
    }
}


const getOrdersByOrderId = async (req, res) => {
    let order_id = req.params.order_id
    try {
        let result = await knex.from('order_detail').select('*').where('order_id', order_id)
        if (result.length == 0) {
            return res.status(400).json({
                message: "This order_id does not exist !",
                status: 404
            })
        }
        return res.status(200).json({
            message: result[0],
            status: 200
        })
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal server error!',
            error: err
        })
    }
}


const getOrderByCustomer = async (req, res) => {

    try {
        let result = await knex.from('orders').select('*')
        // console.log(result)
        if (result.length == 0) {
            return res.status(404).json({
                message: "Page not found !",
                status: 404
            })
        }
        return res.status(200).json({
            message: result[0],
            status: 200
        })
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal server error!',
            error: err
        })
    }
}



const getSortDetialsByOrderId = async (req, res) => {

    let order_id = req.params.order_id;
    try {
        let result = await knex.from('orders').select('orders.order_id', 'orders.total_amount', 'orders.created_on', 'orders.customer_id', 'orders.shipped_on', 'order_detail.product_name')
            .join('order_detail', 'order_detail.item_id', '=', 'orders.order_id')
            .where('orders.order_id', order_id)
        if(result.length == 0){
            return res.status(404).json({
                message: "Page not found !",
                status: 404
            })
        }
        return res.status(200).json({
            message: result[0],
            status: 200
        })
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal server error!',
            error: err
        })
    }
}



module.exports = {
    createOrders,
    getOrdersByOrderId,
    getOrderByCustomer,
    getSortDetialsByOrderId
}