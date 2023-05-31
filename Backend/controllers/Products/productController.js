
const Product = require("../../model/ProductSchema/Product")
const cloudinary = require("cloudinary").v2
const {opts }= require("../../config/cloudinaryConfig");
const getAllProducts = async (req, res) => {

    const data = await Product.find()
    if (data.length === 0) {
        console.log("No Data", !data)
        return res.status(204).json({
            "message": "Data Not Available",
        })
    }

    res.status(200).json(data)
}

const getProductById = async (req, res) => {

    console.log(req.params)
    if (!req?.params?.id) {
        return res.status(400).json({
            "message": "Id parameter required"
        })
    }
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(400).json({
            "message": `No Product  Id matches with ${req.params.id} `
        })
    }
    res.json(product)
}
const addProduct = async (req, res) => {

    console.log(req.body)
    if (!req.body) {
        res.status(400).json({
            "message": "Didn't Received Any Data",
            "error": true
        })
    }
    const data = req.body;
    if (!data.category || !data.name || !data.description || !data.price || !data.quantity || !data.image) {
        res.status(400).json({
            "message": "Some data fields are missing",
            "error": true
        })
    }

    try {
        let options = opts
        options.folder = `EcommerceApp/${req.body.category}`
        const url = await cloudinary.uploader.upload(req.body.image, opts, (err, result) => {
            if (err) console.log("err", err)
            console.log("res", result)
        })
        const newProduct = await Product.create({
            "name": data.name,
            "category": data.category,
            "image": url.secure_url,
            "description": data.description,
            "price": data.price,
            "quantity": data.quantity
        })

        res.status(201).json({
            "message": "New Product is Added Successfully",
            "error": false
        })
    } catch (err) {
        res.status(400).json({
            "message": "Something Went wrong",
            "error": true
        })
    }

}
const updateProduct = async (req, res) => {
    // console.log("Backend ", req)
    // console.log("Backend" , req)
    try {
        if (!req?.body?.id) {
            return res.status(400).json({
                "message": "Id parameter required",
                error: true
            })
        }
        const product = await Product.findOne({ _id: req.body.id }).exec();
        console.log("Product Found", product)
        if (!product) {
            return res.status(400).json({
                "message": `product does not exist with Id ${req.body.id} `,
                error: true
            })
        }
        // console.log(req.body.image)

        if (req.body?.image !== product.image) {
            let options = opts
            options.folder = `EcommerceApp/${req.body.category}`
            const url = await cloudinary.uploader.upload(req.body.image, opts, (err, result) => {
                if (err) console.log("err", err)
                console.log("res", result)
            })
            console.log("REUSLT", url)
            product.image = url.secure_url;
        }

        if (req.body?.category !== product.category) product.category = req.body.category
        if (req.body?.name !== product.name) product.name = req.body.name
        if (req.body?.price !== product.price) product.price = req.body.price
        if (req.body?.quantity !== product.quantity) product.quantity = req.body.quantity
        if (req.body?.description !== product.description) product.description = req.body.description

        console.log("Prodct added", product)

        const result = await product.save();

        res.status(200).json({
            result,
            message: "Product Updated Successfully",
            error: false
        });
    }
    catch (err) {
        console.log("ERRR", err)
    }
}

const deleteProduct = async(req,res)=>{

    console.log("Del Body",req)
    if(!req?.params?.id){
        return res.status(400).json({
            "message" : "product Id is Required",
            "error" : true
        })
    }

    const product = await Product.findOne({_id : req.params.id}).exec();
    if (!product) {
        return res.status(400).json({
            "message": `No Product Id matches with ${req.params.id} `,
            "error" : true
        })
    }

    const result  = await Product.deleteOne({_id : req.params.id});
    res.status(200).json({
        "message" : "Product Deleted SuccessFully",
        "error" : false 
    })
}
module.exports = { getAllProducts, getProductById, updateProduct, addProduct ,deleteProduct}