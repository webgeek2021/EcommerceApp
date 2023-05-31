
import {api , API} from "../baseApi";
import axios from "axios";
import { toast } from "react-toastify"

export const getAllProduct = async ()=>{
    console.log("GetAllProduct")
    
    try{
        const res = await API.get("/products/getProducts")
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
        const res = await API.get(`/products/${id}` )
        console.log("Product with id" , res)

        return res.data
    }catch(err){
        console.log(err)
    }
}

export const editProductData = async (data)=>{

    try{
        const res = await API.put("/products/edit/",data)
        console.log(res)
        if(!res.error){
            toast.success(res.message)
        }else{
            toast.error(res.message)
        }
    }catch(err){
        toast.error(err)
    }
}

export const addProductApi = async (data)=>{
    try{
        const res = await API.post("/products/addproduct",data)

        if(!res.error){
            toast.success(res.message)
        }else{
            toast.error(res.message)
        }
    }catch(err){
        toast.error(err)
    }
}