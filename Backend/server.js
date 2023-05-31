
require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3500
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const dbConnection = require("./config/dbConn")
const {configCloudinary }= require("./config/cloudinaryConfig")

// connecting with mongodb
dbConnection()
configCloudinary()

// cors middleWare
app.use(cors(corsOptions))

// middle for serving different files and data
app.use(express.urlencoded({extended : true}))

// middleware for json data
app.use(express.json())

app.use(express.static(path.join(__dirname,"/public")))

// routes
app.use("/" , require("./routes/root"))
app.use("/auth" , require("./routes/AuthRoutes/auth"))
app.use("/products",require("./routes/ProductRoutes/product"))


mongoose.connection.once('open',()=>{
    console.log("Connected TO MongoDB")
    app.listen(PORT,()=>console.log(`Server Running On Port ${PORT}`));
})



