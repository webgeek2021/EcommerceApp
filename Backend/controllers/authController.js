const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const axios = require("axios")

const User = require("../model/UserSchema/User")

const handleSignUp = async (req, res) => {
    const { googleAccessToken } = req.body
    console.log("Sign Up", googleAccessToken)
    if (googleAccessToken) {
        // signUp with google
        axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        }).then(async response => {
            console.log(response)
            const name = response.data.name;
            const email = response.data.email;
            const profilePicture = response.data.picture;

            const existingUser = await User.findOne({ email })

            if (existingUser) {
                // user already exist
                return res.status(400).json({
                    "message": `User ${name} already exist`,
                    error : true
                })
            }

            const result = await User.create({ verified: "true", name, email, profilePicture })

            const token = jwt.sign({
                email: result.email,
                id: result._id
            }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "1h" })

            const role = result.roles.Admin ? "admin" : "user";
            console.log(result , role)
            res.status(200).json({name,email, role,token ,error : false , message : "Signup successful!"})

        }).catch(err => {
            res.status(400).json({
                "message": "Invalid Access Token",
                error : true
            })
            console.log(err)
        })

    } else {
        // signup with email and password
        const { email, password, userName, confirmPassword } = req.body

        try {
            if (email === "" || password === "" || userName === "" || confirmPassword === "" || confirmPassword !== password) {
                return res.status(401).json({
                    "message": "Invalid Input Fields",
                    "error" : true
                })
            }

            const existingUser = await User.findOne({ email })

            if (existingUser) {
                return res.status(409).json({
                    "message": "User Already exist",
                    "error" : true
                })
            }

            // encrypt password
            const hashpassword = await bcrypt.hash(password, 12);
            // create and store new user
            const result = await User.create({
                "name": userName,
                "password": hashpassword,
                email
            })

            const token = jwt.sign({
                email: result.email,
                id: result._id
            }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "1h" })
            const role = result.roles;
            res.status(200).json({ userName ,role,email , token ,error : false , message : "Signup successful!"})
        } catch (err) {
            console.log(err)
            res.status(401).json({
                "message": err,
                "error" : true
            })
        }
    }
}


const handleSignIn = async (req, res) => {
    console.log("SINGn IN", req.body)
    const  googleAccessToken  = req.body?.googleAccessToken
    if (googleAccessToken) {

        axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        }).then(async response => {
            console.log(response)
            const name = response.data.name;
            const email = response.data.email;
            const profilePicture = response.data.picture;

            const existingUser = await User.findOne({ email })

            if (!existingUser) {
                // user already exist
                res.status(401).json({
                    "message": `User ${name} does not exist`,
                    "error" : true
                })
            }

            const token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
            }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "1h" })
            
            const role = existingUser.roles
            res.status(200).json({ name , email ,role, token ,error : false,  message : "SignIn successful!"})
        }).catch(err => {
            console.log(err)
            res.status(400).json({
                "message": "Something Went Wrong",
                "error" : true
            })
        })
    } else {
        const { email, password } = req.body

        if (email === "" || password === "") return res.status(400).json({ "message": "Invalid Input Field","error" : true })

        try {
            const existUser = await User.findOne({ email })
            if (!existUser) {
                return res.status(401).json({
                    "message": `User  does not exist`,
                    "error" : true
                })
            }
            const isPasswordCorrect = await bcrypt.compare(password, existUser.password);

            if (!isPasswordCorrect) {
                return res.status(401).json({
                    "message": "Invalid Password",
                    "error" : true
                })
            }

            const token = jwt.sign(
                {
                    email: existUser.email,
                    id: existUser._id
                },
                process.env.JWT_ACCESS_TOKEN
                , { expiresIn: "1h" }
            )
            const name = existUser.name
            const role = existUser.roles
            res
                .status(200)
                .json({ name ,email, role,token ,error : false, message : "SignIn successful!"})

        }catch(err){
            console.log(err)
            res.status(400).json({
                "message" : "Something Went Wrong",
                "error" : true
            })
        }
    }
}
module.exports = { handleSignIn, handleSignUp }