
const Product = require("../../model/ProductSchema/Product")
const cloudinary = require("cloudinary").v2
const { opts } = require("../../config/cloudinaryConfig");
const { handleUpload } = require("../../config/cloudinaryConfig");
const Category = require("../../model/CategorySchema/Category");


const getAllProducts = async (req, res) => {

    const data = await Product.find()
    if (data.length === 0) {
        // console.log("No Data", !data)
        return res.status(204).json({
            "message": "Data Not Available",
        })
    }

    res.status(200).json(data)
}

const getProductById = async (req, res) => {

    // console.log(req.params)
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

    // console.log(req.file)
    if (!req.body) {
        res.status(400).json({
            "message": "Didn't Received Any Data",
            "error": true
        })
    }
    const data = req.body;
    // console.log("Data", data)
    if (!data.category || !data.subCategroy || !data.name || !data.description || !data.price || !data.quantity || !req.file) {
        res.status(400).json({
            "message": "Some data fields are missing",
            "error": true
        })
    }

    try {
        const category = data.category
        let category_exist = await Category.findOne({ category: category }).exec()
        // console.log("EXIST", category_exist)
        if (!category_exist) {
            res.status(200).json({
                "message": `${data.category} Does not exist`,
                "error": true
            })
        }else{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI, `EcommerceApp/${req.body.category}`)

        // const cldRes = await cloudinary.uploader.upload(dataURI, {
        //     resource_type: "auto",
        //     folder : `EcommerceApp/${req.body.category}`
        //   });;

        // console.log("Cloudinary Url", cldRes)
        const newProduct = await Product.create({
            "name": data.name,
            "category": data.category,
            "image": cldRes.secure_url,
            "description": data.description,
            "price": data.price,
            "quantity": data.quantity,
            "subCategroy": data.subCategroy
        })

        // console.log("New Product", newProduct)
        // console.log("Category", category_exist)

        const arr = [...category_exist.products, newProduct.id]

        category_exist.products = arr
        if (!category_exist.subCategories.includes(data.subCategroy)) {
            category_exist.subCategories.push(data.subCategroy)
        }
        await category_exist.save()

        res.status(200).json({
            "message": "New Product is Added Successfully",
            "error": false
        })
    }
    } catch (err) {
        // console.log(err.message)
        res.status(400).json({
            "message": `${err.message}`,
            "error": true
        })
    }

}
const updateProduct = async (req, res) => {
    // console.log("Backend ", req)
    // console.log("Backend", req.file)
    try {
        if (!req?.body?.id) {
            return res.status(400).json({
                "message": "Id parameter required",
                error: true
            })
        }
        const product = await Product.findOne({ _id: req.body.id }).exec();
        // console.log("Product Found", product)
        if (!product) {
            return res.status(400).json({
                "message": `product does not exist with Id ${req.body.id} `,
                error: true
            })
        }
        // console.log(req.body.image)
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const cldRes = await handleUpload(dataURI, `EcommerceApp/${req.body.category}`)

            if (cldRes.secure_url !== product.image) {
                // let options = opts
                // options.folder = `EcommerceApp/${req.body.category}`
                // const url = await cloudinary.uploader.upload(req.body.image, opts, (err, result) => {
                //     if (err) console.log("err", err)
                //     console.log("res", result)
                // })
                // console.log("REUSLT", url)
                product.image = cldRes.secure_url;
            }
        }


        if (req.body?.category !== product.category) product.category = req.body.category
        if (req.body?.subCategory !== product.subCategory) product.subCategory = req.body.subCategory
        if (req.body?.name !== product.name) product.name = req.body.name
        if (req.body?.price !== product.price) product.price = req.body.price
        if (req.body?.quantity !== product.quantity) product.quantity = req.body.quantity
        if (req.body?.description !== product.description) product.description = req.body.description

        // console.log("Prodct added", product)

        const result = await product.save();

        res.status(200).json({
            result,
            message: "Product Updated Successfully",
            error: false
        });
    }
    catch (err) {
        // console.log("ERRR", err)
    }
}

const deleteProduct = async (req, res) => {

    // console.log("Del Body", req)
    if (!req?.params?.id) {
        return res.status(400).json({
            "message": "product Id is Required",
            "error": true
        })
    }

    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(400).json({
            "message": `No Product Id matches with ${req.params.id} `,
            "error": true
        })
    }

    const result = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
        "message": "Product Deleted SuccessFully",
        "error": false
    })
}

const getProductByCategory = async (req, res) => {
    const { category } = req.params

    if (!category) {
        res.status(400).json({
            "message": "Something Went Wrong",
            "error": true
        })
    }

    const product = await Product.find({ category }).exec()

    res.status(200).json({
        "data": product,
        "error": false
    })
}

const filterProduct = async (req, res) => {
    const body = req.body
    if (!body) {
        res.status(400).json({
            "message": "Data is Missing",
            "error": true
        })
    }
    try {
        const { category, subcategory } = req.body

        const Allproducts = await Product.find({ category }).exec()
        // console.log("Allproduct" , Allproducts)
        const product = Allproducts.filter((product) => product.subCategroy.toLowerCase() === subcategory.toLowerCase())
        // console.log("Products" , product)
        res.status(200).json({
            "data": product,
            "error": false
        })
    }catch(err){
        // console.log(err)
        res.status(400).json({
            "message" : err.message,
            "error" : true
        })
    }
}


const addReview = async(req,res)=>{
    const body = req.body
    try{

        if(!body){
            res.status(400).json({
                "message" : "Data is missing",
                "error" : true
            })
        }

        const _id = body.productId

        const product = await Product.findOne({_id}).exec()
        // console.log("Product" , product)

        const obj = {
            reviewBy : body.reviewBy,
            ratingGiven : body.ratingGiven,
            reviewMessage : body.reviewMessage,
            profileImage : body.profileImage
        }
        const result = product.reviews.find((user)=>user.reviewBy === body.reviewBy)
        if(result){
            return res.status(200).json({
                "message" : "Already Submitted Review",
                "error" : false
            })
        }
        // console.log("Before" ,  product.reviews)
        
        product.reviews.push(obj)
        // console.log("After" , product.reviews)

        const ratingSum = product.reviews.reduce((total, obj) => total + obj.ratingGiven, 0)

        product.rating = ratingSum / product.reviews.length 

        await product.save()

        res.status(200).json({
            "message" : "Review Submitted",
            "error" : false
        })

    }catch(err){
        // console.log(err)
        res.status(400).json({
            "message" : err.message,
            "error" : true
        })
    }
}

const searchProductByQuery = async(req,res)=>{
    const {query} = req.params
    
    try{
        const products = await Product.find().exec()

        if(query){
            // console.log("Query" , query)
            const match = products.filter(pro=> pro.name.toLowerCase().includes(query.toLowerCase()))
            const list = match.map((pro) => pro.name)

            // console.log("Q_LISt1" , list)
            res.status(200).json({
                "data" : list,
                "error" : false 
            })
        }

    }catch(err){
        // console.log(err)
        res.status(400).json({
            "message" : "Something Went Wrong",
            "error" : true
        })
    }
}

const getProductBySearch = async(req,res)=>{
    const {query} = req.params

    try{
        const products = await Product.find().exec()

        if(query){
            // console.log("Query" , query)
            const match = products.filter(pro=> pro.name.toLowerCase().includes(query.toLowerCase()))
            
            // console.log("Q_LISt1" , match)
            res.status(200).json({
                "data" : match,
                "error" : false 
            })
        }

    }catch(err){
        // console.log(err)
        res.status(400).json({
            "message" : "Something Went Wrong",
            "error" : true
        })
    }
}
module.exports = { getAllProducts, getProductById, updateProduct, addProduct, deleteProduct, getProductByCategory, filterProduct,addReview ,searchProductByQuery ,getProductBySearch}