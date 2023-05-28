
const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyJwt = (req,res,next)=>{
    const authUser = req.headers.authorization || req.headers.Authorization;
    console.log("verify jwt , authUser",authUser)
    if(!authUser?.startsWith("Bearer")) return res.sendStatus(401)
    console.log(authUser)
    const token = authUser.split(" ")[1]
    jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN,
        (err , decoded)=>{
            if(err){
                // 403 is invalid token
                return res.sendStatus(403)
            }
            req.user = decoded.userInfo.username;
            req.roles = decoded.userInfo.roles
            next();
        }
    )
}

module.exports = verifyJwt