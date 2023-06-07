

const User = require("../../model/UserSchema/User")
const ShippingSchema = require("../../model/ShippingSchema/shippingSchema");
const shippingSchema = require("../../model/ShippingSchema/shippingSchema");
const getUser = async (req,res)=>{
    const email = req.user.email;

    console.log("BODy" , req.user)

    try{
        const user = await User.findOne({email : email}).exec()
        const details = {
            name : user.name,
            id : user.id,
            email : user.email,
            profileImage : user.profilePicture,
        }
        if(!user){
            return res.status(400).json({
                "message" : "User Doesn't Exist",
                "error" : true
            })
        }
        
        return res.status(201).json({
            "user" : details,
            "error" : false
        })

    }catch(err){
        console.log(err)
    }
}


const updateUser = async (req,res)=>{

    const data = req.body
    console.log(data)
    if(!req.body){
        return res.status(400).json({
            "message" : "Didnt Received Data",
            "error"  :true
        })
    }
    try{
        const user = req.body
        const email = user.email
        const existUser = await User.findOne({email}).exec()

        if(!existUser){
            return res.status(400).json({
                "message" : "User Did'nt exist",
                "error"  :true
            })
        }

        if(existUser.name !== user.name) existUser.name = user.name
        if(existUser.email !== user.email) existUser.email = user.email
        if(existUser.profilePicture !== user.profilePicture) existUser.profilePicture = user.profilePicture

        const result = await existUser.save()
        console.log(result)
        const data  = {
            name : result.name,
            email : result.email,
            profilePicture : result.profilePicture 
        } 
        res.status(200).json({
            "userInfo" : data,
            "message" : "Information Updated Successfully",
            "error" : false
        })
    }catch(err){
        console.log(err)
    }
}

const getShippingDetails = async (req,res)=>{
    
    const data = req.user
    console.log("Data" , data )
    if(!data){
        res.status(400).json({
            "message" : "Something Went Wrong",
            "error" : true
        })
    }

    const userId = data.id
    const shippingDetails =  await ShippingSchema.findOne({userId}).exec()

    console.log("Ship" , shippingDetails)
    res.status(200).json({
        "error" : false,
        "data" : shippingDetails
    })

}

const updateShippingDetails = async (req,res)=>{
    const body = req?.body

    if(!body){
        res.status(400).json({
            "message" : "Something Went wrong",
            "error" : true
        })
    }

    const email = body.email
    if(!email){
        res.status(400).json({
            "message" : "Email did'nt found",
            "error" : true
        })
    }
    const userId = req.user.id
    const existingDetails = await ShippingSchema.findOne({userId}).exec()
    console.log("Existing details 1" , existingDetails)
    if(existingDetails){
        if(existingDetails.country !== body.country) existingDetails.country = body.country
        if(existingDetails.city !== body.city) existingDetails.city = body.city
        if(existingDetails.address !== body.address) existingDetails.address = body.address
        if(existingDetails.postalCode !== body.postalCode) existingDetails.postalCode = body.postalCode
        if(existingDetails.state !== body.state) existingDetails.state = body.state
        if(existingDetails.userId !== body.userId) existingDetails.userId = req.user.id
        
        console.log("Existing details 2" , existingDetails) 
        const result = await existingDetails.save()

        // if(result){
            res.status(200).json({
                "message" : "Shipping Details Updated SuccessFully",
                "error" : false
            })
        // }
    }else{
        body.userId = req.user.id
        const result = await ShippingSchema.create(body)
        res.status(200).json({
            "message" : "Shipping Details Added SuccessFully",
            "error" : false
        })
    }
}   
module.exports = {getUser , updateUser , getShippingDetails , updateShippingDetails}