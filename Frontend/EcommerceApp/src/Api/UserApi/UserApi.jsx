
import { preLoginApi , postLoginApi } from "../baseApi"
import { useDispatch , useSelector } from "react-redux"
import {toast} from "react-toastify"
import { setUserInfo } from "../../ReduxStore/slices/ProfileSlice"
import Cookie from "js-cookie"
import { USER_INFO } from "../../utils/constants"
export const getUser = async(email)=>{
    console.log("EMAIL USER" , email)
    const dispatch = useDispatch()
    try{
        await postLoginApi.get("/user/getUser" , email).then(res =>{
            if(res.data.error){
                toast.error("SomeThing Wen Wrong")
            }else{
                dispatch(setUserInfo(res.data.user))
            }
        })

        
        // if(data){
        //     return data
        // }

    }catch(err){
        console.log(err)
    }
}

export const updateUserProfile = async (data)=>{
    try{
        const result = await postLoginApi.put("/user/update/profile" , data)

        if(result.data.error){
            toast.error("Some thing Went Wrong")
        }else{
            toast.success(result.data.message)
            let cooki = JSON.parse(Cookie.get(USER_INFO))
            let newCooki = {...cooki , name : result.data.userInfo.name , email : result.data.userInfo.email}
            Cookie.set(USER_INFO , JSON.stringify(newCooki))
        }
    }catch(err){
        console.log(err)
    }
}


export const getShippingDetails = async (data , setFunc)=>{
    try{
        const result = await postLoginApi.get("/user/shippingDetails" ,data)
        if(!result.data.error){
                const d = result.data.data
                const obj  = {
                    country : d?.country || "",
                    city : d?.city || "",
                    postalCode : d?.postalCode || "",
                    state : d?.state || "",
                    address : d?.address || "",
                    id : d?._id,
                    userId : d?.userId

                }
                console.log("OBJ" , obj)
                setFunc(obj)
            }
        
    }catch(err){
        console.log(err)
    }
}

export const updateShippingDetails = async (data)=>{
    try{

        const result = await postLoginApi.put("/user/update/shippingDetails" , data)
        if(!result.data.error){
            toast.success(result.data.message)
        }else{
            toast.error("Something went Wrong")
        }
    }catch(err){
        console.log(err)
    }
}