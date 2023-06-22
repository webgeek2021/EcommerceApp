import { toast } from "react-toastify";
import { postLoginApi } from "../baseApi";
import Logo from "../../assets/Icons/logo.svg"
import { CART } from "../../utils/constants";
import { setOrderList } from "../../ReduxStore/slices/OrderSlice";
import { setTotalEarning } from "../../ReduxStore/slices/adminDashboard";

export const placeOrder = async (data)=>{
    try{
        const result = await postLoginApi.post("/order" , data)
        console.log("PlaceOrder" , result)

        const options = {
            key : import.meta.env.VITE_RAZORPAY_API_KEY,
            amount: result.data.data.amount,
            currency: "INR",
            name: "ShopCart",
            description: "Payment",
            image: Logo,
            order_id: result.data.data.id,
            callback_url: `http://localhost:3500/order/paymentVerification`,
            prefill: {
                name: data.name,
                email: data.email,
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
        
        if(result.data.error){
            toast.error("Something Went Wrong")
        }else{
            // localStorage.clear(CART)
            toast.success(result.data.message)
        }
    }catch(err){
        console.log(err)
    }
}

export const payNow =  async (data)=>{
    console.log(data)
    try {
        const options = {
            key : import.meta.env.VITE_RAZORPAY_API_KEY,
            amount: data.amount,
            currency: "INR",
            name: "ShopCart",
            description: "Payment",
            image: Logo,
            order_id: data.id,
            callback_url: `http://localhost:3500/order/paymentVerification`,
            prefill: {
                email: data.email,
                name : ""
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    } catch (error) {
        console.log(error)
    }
}

export const getOrders = async (dispatch , data)=>{
    try {
        const result = await postLoginApi.post("/order/getOrder",data)
        console.log("Result" , result)
        dispatch(setOrderList(result.data.data))
    } catch (error) {
        console.log(error)
    }
}

export const getAllOrders = async (setOrderList)=>{
    try{
        const result = await postLoginApi.get("/order/getAllOrder")
        setOrderList(result.data.data)
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

export const setOrderStatus = async (data)=>{
    try{
        console.log("OrderStatus" , data)

        const result = await postLoginApi.put("/order/setOrderStatus" , data)
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

export const getTotalAmount = async (dispatch)=>{
    try{
        const data = await postLoginApi.get("/order/getTotal")
        console.log("Total " , data)
        dispatch(setTotalEarning(data.data.total))
    }catch(err){
        console.log(err)
    }
}

export const getSalesPieData = async ()=>{
    
}


export const deleteOrder = async (data)=>{
    try{
        const result = await postLoginApi.delete("/order/deleteOrder" , data)

        if(!result?.data.data.error)
            toast.success(result.data.data.message)
        else
            toast.error(result.data.data.message)
    }catch(err){
        console.log(err)
        toast.error(err)
    }
}