import { toast } from "react-toastify";
import { postLoginApi } from "../baseApi";
import Logo from "../../assets/Icons/logo.svg"

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
            toast.success(result.data.message)
        }
    }catch(err){
        console.log(err)
    }
}