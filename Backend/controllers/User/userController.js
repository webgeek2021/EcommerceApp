
const User = require("../../model/UserSchema/User")

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
module.exports = {getUser , updateUser}