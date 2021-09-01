const knex = require('../connectionDB/connection');
const { createToken } = require('../middleware/createToken');


const customerRegister = async (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        region: req.body.region,
        postal_code: req.body.postal_code,
        country: req.body.country,
        shipping_region_id: req.body.shipping_region_id,
        day_phone: req.body.day_phone,
        eve_phone: req.body.eve_phone,
        mob_phone: req.body.mob_phone,
        credit_card: req.body.credit_card
    }
    try {
        await knex.from('customer').insert(userData)
        return res.status(200).json({
            message: "Registered Successfully !",
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


const customerLogin = async (req, res) => {
    try {
        await knex.from('customer').select('*').where('email', req.body.email).where('password', req.body.password)
            .then((data) => {
                console.log(data,"hhhh")
                if (Object.keys(data).length == 0) {
                    return res.status(404).json({
                        message: 'Invalid email or password !',
                        status: 404
                    })
                }
                const token = createToken({ email: req.body.email }, process.env.SECRET_KEY, { expiresIn: '24h' })
                res.cookie('token', token);
                return res.status(200).json({
                    message: "Login Successfully",
                    token: token
                })
            })
    }
    catch {
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }
}


const getCustomerById = async (req, res) => {

    let id = req.params.customer_id
    try {
        let data = await knex.from('customer').select('*').where('customer_id', id);
        if (data.length == 0) {
            return res.status(400).json({
                message: "This ID not Exist !",
                status: 400
            });
        }
        return res.status(201).json({
            message: data[0],
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



const updateCustomerDetialsById = async (req, res, next) => {
    let { name, email, password } = req.body;
    let id = req.params.customer_id;
    try {
        let result = await knex.from('customer').update({ name: name, email: email, password: password }).where('customer_id', id);
        if (result.length == 0) {
            return res.status(404).json({
                message: "page not found!"
            })
        }
        return res.status(200).json({
            message: "Updated !",
            status: 200
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error!',
            error: err
        })
    }
}


const updateAddressById = async (req, res) => {
    let { country, region, city } = req.body;
    let id = req.params.customer_id;
    try {
        let result = await knex.from('customer').update({ country: country, region: region, city: city }).where('customer_id', id);
        if (result.length == 0) {
            return res.status(404).json({
                message: "page not found! || Id Not Exist!"
            })
        }
        return res.status(200).json({
            message: "Updated !",
            status: 200
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error...!',
            error: err
        })
    }
}


const updateCreditCardById = async (req, res) => {
    // let credit_card = req.body.credit_card;
    // let id = req.params.customer_id;
    // try {
    //     let result = await knex.from('customer').update({ credit_card:credit_card}).where('customer_id', id);
    //     console.log(result,"kkkk")
    //     if (result.length == 0) {
    //         return res.status(404).json({
    //             message: "page not found! || Id Not Exist!"
    //         })
    //     }
    //     return res.status(200).json({
    //         message: "Credit-Card Updated !",
    //         status: 200
    //     })
    // } catch (err) {
    //     return res.status(500).json({
    //         message: 'Internal server error...!',
    //         error: err
    //     })
    // }

    let credit_card = req.body.credit_card;
    let id = req.params.customer_id;
    try {
        // let result = await knex('customer').where('email', req.body.email)
        // .update({
        //     credit_card: req.body.credit_card,
        //     address_1: req.body.address_1,
        //     address_2: req.body.address_2,
        //     city: req.body.city,
        //     region: req.body.region,
        //     postal_code: req.body.postal_code,
        //     country: req.body.country,
        //     shipping_region_id: req.body.shipping_region_id,
        //     day_phone: req.body.day_phone,
        //     eve_phone: req.body.eve_phone,
        //     mob_phone: req.body.mob_phone
        // })
        const { name } = req.body;
        let result = await knex("client")
            .update({ name })
            .where({ id })
        console.log(result, "kkkk")
        if (result.length == 0) {
            return res.status(404).json({
                message: "page not found! || Id Not Exist!"
            })
        }
        return res.status(200).json({
            message: "Credit-Card Updated !",
            status: 200
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error...!',
            error: err
        })
    }

}



module.exports = {
    customerRegister,
    customerLogin,
    getCustomerById,
    updateCustomerDetialsById,
    updateAddressById,
    updateCreditCardById
}