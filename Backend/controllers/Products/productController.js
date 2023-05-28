
const Product = require("../../model/ProductSchema/Product")

const getAllProducts =  async (req, res) => {

    const data = await Product.find()
    if(data.length === 0){
        console.log("No Data" , !data)
        return res.status(204).json({
            "message" : "Data Not Available",
        })
    }

    res.status(200).json(data)
}

module.exports = {getAllProducts}