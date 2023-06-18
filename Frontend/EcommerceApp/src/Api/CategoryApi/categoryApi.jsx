
import { postLoginApi } from "../baseApi";
import { setCategoryList } from "../../ReduxStore/slices/categorySlice";
export const getAllCategories = async(dispatch)=>{
    try{
        const result = await postLoginApi.get("/category/get-category-list")
        console.log(result)
        dispatch(setCategoryList(result.data.data))
    }catch(err){
        console.log(err)
    }
}