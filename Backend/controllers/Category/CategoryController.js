const Category = require("../../model/CategorySchema/Category")
const { handleUpload } = require("../../config/cloudinaryConfig")
const Product = require("../../model/ProductSchema/Product")
const getCategoryList = async (req, res) => {
    try {
        const categories = await Category.find().exec()

        const list = categories?.map((category) => ({
            "category": category.category,
            "description": category.description,
            "image": category.image,
            "totalSale": category.totalSale
        }))
        console.log(list)
        res.status(200).json({
            data: list,
            error: false
        })
    } catch (err) {
        console.log(err)
    }
}

const addCategory = async (req, res) => {

    if (!req.body) {
        res.status(400).json({
            "message": "Did'n Received Any Data",
            "error": true
        })
    }
    const body = req.body
    console.log("Body", body.category)
    console.log("File", req.file)

    if (!body.category || !req.file || !body.description) {
        res.status(400).json({
            "message": "Some data fields are missing",
            "error": true
        })
    }
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI, `EcommerceApp/${body.category}`)


        const isExist = await Category.findOne({ category: body.category }).exec()

        if (isExist) {
            return res.status(401).json({
                "message": "Category Already Exist",
                "error": false
            })
        }
        const newCategory = await Category.create({
            category: body.category,
            description: body.description,
            image: cldRes.secure_url
        })

        res.status(201).json({
            "message": "New Category is Added Successfully",
            "error": false
        })
    } catch (err) {

        console.log(err)
        res.status(400).json({
            "message": "Something Went wrong",
            "error": true
        })
    }
}

const getProductByCategory = async (req, res) => {
    const { category } = req.params;

    if (!category) {
        res.status(400).json({
            "message": "Category is Missing",
            "error": true
        })
    }
    try {
        const productList = await Product.find().exec()

        if (productList) {
            const list = productList.filter((prod) => prod.category === category)

            res.status(200).json({
                "data": list,
                "error": false
            })
        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            "message" : "Something went Wrong",
            "error" : true
        })
    }
}

module.exports = { getCategoryList, addCategory, getProductByCategory }