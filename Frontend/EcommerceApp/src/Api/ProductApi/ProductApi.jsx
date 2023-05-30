
import {api} from "../baseApi";
import axios from "axios";

export const getAllProduct = async ()=>{
    console.log("GetAllProduct")
    
    try{
        const res = await api.get("/products/getProducts")
        console.log("Resp" , res)
        return res.data
    }catch(err){
        console.log(err)
    }
    // console.log("Data" ,data)
}

export const getProductById = async (id)=>{
    const data = id
    try{
        const res = await api.get(`/products/${id}` )
        console.log("Product with id" , res)

        return res.data
    }catch(err){
        console.log(err)
    }
}