const knex = require('../connectionDB/connection');

const genrateUniqueId = async (req, res) => {

    try {
        let cart_id = Math.random().toString(36).slice(2)
        return res.status(200).json({
            message: "genrated unique cart_id !",
            status: 200,
            cart_id: cart_id
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server Error or other Error !",
            Error: err
        })
    }

}

const addProductInCart = async (req, res) => {
    let { cart_id, product_id, attributes } = req.body;
    let cart = {
        cart_id: cart_id,
        product_id: product_id,
        attributes: attributes,
        quantity: 1,
        added_on: new Date()
    }
    try {
        let result = await knex.from('shopping_cart').insert(cart)
        return res.status(200).json({
            message: "added cart in shopping cart !",
            status: 200
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server Error or other Error !",
            Error: err
        })
    }
}


const getShoppingCartById = async (req, res) => {

    let id = req.params.cart_id;
    try {
        let result = await knex.from('shopping_cart').select('shopping_cart.item_id', 'product.name', 'shopping_cart.attributes', 'product.product_id', 'product.image', 'product.price', 'shopping_cart.quantity')
            .join('attribute_value', 'attribute_value.attribute_id', '=', 'shopping_cart.item_id')
            .join('product_attribute', 'product_attribute.attribute_value_id', '=', 'attribute_value.attribute_value_id')
            .join('product', 'product.product_id', '=', 'product_attribute.product_id')
            .where('shopping_cart.cart_id', id)
        console.log(result, "kkk")
        if (result.length == 0) {
            return res.status(400).json({
                message: "Do Not Exist Data With This ID !",
                status: 400
            })
        }
        return res.status(200).json({
            message: result,
            status: 201
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server Error or other Error !",
            Error: err
        })
    }

}

const updateCartByItem = async (req, res) => {
    let item_id = req.params.item_id;
    let quantity = req.body.quantity;
    try {
        let result = await knex.from('shopping_cart').update({ quantity: quantity }).where('item_id', item_id)
        // console.log(result)
        if (result.length || result == 0) {
            return res.status(400).json({
                message: "Do Not Exist Data With This ID...",
                status: 400
            })
        }
        await knex.from('shopping_cart').select('*').then((data) => {
            return res.status(200).json({
                message: data,
                status: 201
            })
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server Error or other Error !",
            Error: err
        })
    }
}

const deleteCartByCart_Id = async (req, res) => {
    try {
        let result = await knex.from('shopping_cart').where('cart_id', req.params.cart_id).del()
        console.log(result)
        if (result == 0) {
            return res.status(400).json({
                message: "Do Not Exist Data With This ID...",
                status: 400
            })
        }
        return res.status(200).json({
            message: "Deleted Cart !",
            status: 201
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server Error or other Error !",
            Error: err
        })
    }
}


const moveProductToCart = async (req, res) => {
    console.log("***********")
    await knex.schema.createTableIfNotExists('cart', function (table) {
        table.increments('item_id').primary();
        table.string('cart_id');
        table.integer('product_id');
        table.string('attributes');
        table.integer('quantity');
        table.integer('buy_now');
        table.datetime('added_on');
    }).then(() => { console.log("Table Created...") }).catch((err) => { console.log(err) })
    let result = await knex.from('shopping_cart').select('*').where('item_id', req.params.item_id)
    console.log(result, "yyyyy")
    if (result.length == 0) {
        return res.status(400).json({ message: "Do Not Exist Data With This ID..", status: 400 })
    }
    await knex.from('cart').insert(result).then((data) => {
        return res.status(200).json({ message: "data move from shopping_cart to cart successfully!", status: 200 });
    }).catch((err) => {
        return res.status(400).json({ message: err, status: 404 })
    });
}

const getTotalAmountByCartId = async (req, res) => {
    let id = req.params.cart_id
    try {
        let result = await knex.from('shopping_cart').select('quantity', 'price')
            .join('product', 'shopping_cart.product_id', '=', 'product.product_id')
            .where('shopping_cart.cart_id', id)
        console.log(result, "oo")
        if (result.length == 0) {
            return res.status(400).json({
                message: "Do Not Exist Data With This ID",
                status: 400
            })
        }
        let total_Amount;
        for (let i of data) {
            total_Amount = i.quantity * i.price;
        }
        return res.status(200).json({ total_Amount: total_Amount });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server Error or other Error !",
            Error: err
        })
    }
}


module.exports = {
    genrateUniqueId,
    addProductInCart,
    getShoppingCartById,
    updateCartByItem,
    deleteCartByCart_Id,
    moveProductToCart,
    getTotalAmountByCartId
}