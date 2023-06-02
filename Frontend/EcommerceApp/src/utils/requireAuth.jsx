
import Cookie from "js-cookie"
import { USER_INFO } from "./constants"
export const requireAuth = ()=>{

    const user = Cookie.get(USER_INFO)

    if(user){
        return JSON.parse(user).token
    }

}

export const requireAdminAuth = ()=>{
    let user = Cookie.get(USER_INFO)
    console.log("USER" , user)
    if(user){
        user = JSON.parse(user)
        return user?.token && user?.isAdmin 
    }
}