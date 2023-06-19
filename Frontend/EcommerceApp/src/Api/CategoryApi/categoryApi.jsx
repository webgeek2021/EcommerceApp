
import { postLoginApi } from "../baseApi";
import { setCategoryList } from "../../ReduxStore/slices/categorySlice";
import { toast } from "react-toastify";
export const getAllCategories = async(dispatch)=>{
    try{
        const result = await postLoginApi.get("/category/get-category-list")
        console.log(result)
        dispatch(setCategoryList(result.data.data))
    }catch(err){
        console.log(err)
    }
}


export const addCategory = async (data)=>{
    try {
        const result = await postLoginApi.post("/category/addcategory" , data)
        console.log(result)
        if(!result.data.error){
            toast.success(result.data.message)
        }else{
            toast.error(result.data.message)
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const getAllProductByCategory = async (category , setProductData)=>{
    try{
        const result = await postLoginApi.get(`/category/${category}`)

        console.log(result)
        if(result.data.data){
            setProductData(result.data.data)
        }
    }catch(err){
        console.log(err)
    }
}