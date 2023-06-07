import { toast } from "react-toastify";
import { postLoginApi } from "../baseApi";


export const placeOrder = async (data)=>{
    try{
        const result = await postLoginApi.post("/order" , data)
        console.log("PlaceOrder" , result)
        if(result.data.error){
            toast.error("Something Went Wrong")
        }else{
            toast.success(result.data.message)
        }
    }catch(err){
        console.log(err)
    }
}