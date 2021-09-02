const knex = require('../connectionDB/connection')

const getShippingRegions = async (req, res) => {
    try {
        let result = await knex.from('shipping_region').select('*')
        return res.status(200).json({
            message: result
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server Error or other Error !",
            Error: err
        })
    }

}



const getShippingRegionsByShippingRegionsId = async (req, res) => {
    let id = req.params.shipping_region_id;
    try {
        let result = await knex.from('shipping_region').select('*').where('shipping_region_id', id)
        if(result.length==0){
            return res.status(400).json({
                message: "Do Not Exist Data With This ID...",
                status: 400
            })
        }
        return res.status(200).json({
            message: result
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server Error or other Error !",
            Error: err
        })
    }
}


module.exports = {
    getShippingRegions,
    getShippingRegionsByShippingRegionsId
}
