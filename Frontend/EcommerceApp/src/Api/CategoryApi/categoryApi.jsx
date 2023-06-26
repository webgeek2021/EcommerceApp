
import { postLoginApi } from "../baseApi";
import { setCategoryList , setCategorySubList} from "../../ReduxStore/slices/categorySlice";
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

export const getCategoryPieChartData = async (setPieDataLabels , setPieData)=>{

    try {
        const result = await postLoginApi.get("/category/chartData/pie")
        console.log(result)

        const labels = result?.data?.data?.map((d)=> d.category)
        setPieDataLabels(labels)

        const pieData = result?.data?.data?.map((d)=>d.products)
        setPieData(pieData)
        
    } catch (error) {
        console.log(error)
    }
}

export const getCategorySalesData = async(setPieDataLabels , setPieData)=>{
    try {
        const result = await postLoginApi.get("/category/chartData/sales/pie")
        console.log("Result" , result)
        const labels = result?.data?.data?.map((d)=> d.category)
        setPieDataLabels(labels)

        const pieData = result?.data?.data?.map((d)=>d.totalSale)
        setPieData(pieData)
    } catch (error) {
        console.log(error)
    }
}

export const getSubcategory = async (category , dispatch)=>{
    try {
        const result = await postLoginApi.get(`/category/subCategory/${category}`)
        console.log(result)
        dispatch(setCategorySubList(result.data.data))
        return 
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteCategory = async (id , navigate)=>{
    try{
        const result  = await postLoginApi.delete(`/category/delete/${id}`)

        if(!result.data.error){
            toast.success(result.data.message)
            navigate("/admin/add-category")
        }
    }catch(err){
        console.log(err)
    }
}