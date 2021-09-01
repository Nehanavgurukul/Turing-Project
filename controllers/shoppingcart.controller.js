const knex = require('../connectionDB/connection');

const genrateUniqueId = async (req, res) => {

    try {
        let cart_id = Math.random().toString(36).slice(2)
        return res.status(200).json({
            message: "genrated unique cart_id !",
            status: 200,
            cart_id : cart_id
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Internal server Error or other Error !",
            Error : err
        })
    }
    
}

const addProductInCart = async(req, res) => {
    let {cart_id, product_id, attributes} = req.body;
    let cart = {
        cart_id :cart_id,
        product_id :product_id,
        attributes :attributes,
        quantity: 1,
        added_on: new Date()
    }
    try{
        let result = await knex.from('shopping_cart').insert(cart)
        return res.status(200).json({
            message : "added cart in shopping cart !",
            status : 200
        })

    }
    catch(err){
        return res.status(500).json({
            message : "Internal server Error or other Error !",
            Error : err
        })
    }
}

module.exports = {
    genrateUniqueId,
    addProductInCart
}