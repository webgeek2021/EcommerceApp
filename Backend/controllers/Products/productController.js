
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

const getProductById = async(req,res)=>{
   
    console.log(req.params)
    if(!req?.params?.id ){
        return res.status(400).json({
            "message" : "Id parameter required"
        })
    }
    const product = await Product.findOne({_id : req.params.id}).exec();
    if (!product) {
        return res.status(400).json({
            "message": `No Product  Id matches with ${req.params.id} `
        })
    }
    res.json(product)
}
module.exports = {getAllProducts , getProductById}