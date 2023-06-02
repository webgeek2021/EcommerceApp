
import {preLoginApi , postLoginApi} from "../baseApi";
import axios from "axios";
import { toast } from "react-toastify"
import { insertIntoProductList, insertProductData } from "../../ReduxStore/slices/productDataSlice";

export const getAllProduct = async ()=>{
    console.log("GetAllProduct")
    
    try{
        const res = await postLoginApi.get("/products/getProducts")
        console.log("Resp" , res)
        return res.data
    }catch(err){
        console.log(err)
    }
    // console.log("Data" ,data)
}

export const getProductById = async (id )=>{
    const data = id
    try{
        const res = await postLoginApi.get(`/products/${id}` )
        console.log("Product with id" , res)

        return res.data
    }catch(err){
        console.log(err)
    }
}
export const getProductById2 = async (id, dispatch)=>{
    try{
        const res = await postLoginApi.get(`/products/${id}` )
        console.log("Product with id" , res)
        if(res.data){
            console.log("RES body" , res.data)
            dispatch(insertProductData(res.data))
        }
    }catch(err){
        console.log(err)
        toast.error(err)
    }
}
export const getProductList  = async (id , dispatch,order) =>{
    try{
        const res = await postLoginApi.get(`/products/${id}`)
        console.log("LIST",res)
        if(res.data){
            res.data.orderQuantity  = order
            dispatch(insertIntoProductList(res.data))
        }
    }catch(err){
        console.log(err)
        toast.error(err)
    }
}
export const editProductData = async (data)=>{

    try{
        const res = await postLoginApi.put("/products/edit/",data)
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
        const res = await postLoginApi.post("/products/addproduct",data)
        console.log("AddProduct Response" , res)
        if(!res.data.error){
            toast.success(res.data.message)
          
        }else{
            toast.error(res.data.message)
        }
    }catch(err){
        toast.error(err)
    }
}

export const deleteProduct = async (id ,navigate) => {
   
    try{
        const res = await postLoginApi.delete(`/products/delete/${id}`)
        console.log("DEL RES" , res)
        if(!res.data.error){
            toast.success(res.data.message)
            navigate("/admin/add-product")
        }else{
            toast.error(res.data.message)
        }
    }catch(err){
        console.log(err)
        toast.error(err)
    }
}