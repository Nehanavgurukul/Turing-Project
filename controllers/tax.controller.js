const knex = require('../connectionDB/connection');

const getTaxes = async (req, res) => {
    await knex('tax').select('*').then((data) => {
        return res.status(200).send(data)
    })
        .catch((err) => {
            return res.status(400).json({ message: err, status: 404 })
        })
}


const getTaxByTaxId = async (req, res) => {
    await knex('tax').select('*').where('tax_id', req.params.tax_id)
        .then((data) => {
            if (data.length == 0) {
                return res.status(404).json({
                    message: "Id does not exists !"
                })
            }
            return res.status(200).json({
                message: data
            })
        })
        .catch((err) => {
            return res.status(400).json({ message: err, status: 404 })
        })
}

module.exports = {
    getTaxes,
    getTaxByTaxId
}