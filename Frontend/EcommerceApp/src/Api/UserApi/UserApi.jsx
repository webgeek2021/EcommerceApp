
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