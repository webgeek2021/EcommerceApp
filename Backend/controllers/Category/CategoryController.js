const Category = require("../../model/CategorySchema/Category")

const getCategoryList = async (req , res)=>{
    try{
        const categories = await Category.find().exec()

        const list = categories?.map((category) => {category.category , category.description , category.image , category.totalSale})
        res.status(200).json({
            data : list,
            error : false
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = {getCategoryList}