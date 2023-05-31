
import axios from "axios"
import { USER_INFO } from "../utils/constants"
export const API = axios.create({baseURL:"http://localhost:3500"}) // post login api

API.interceptors.request.use((req)=>{
    // if(localStorage.getItem(USER_INFO)){
        console.log("BaseApi" , JSON.parse(localStorage.getItem(USER_INFO)).token)
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(USER_INFO)).token}`
        req.headers.roles = `${JSON.parse(localStorage.getItem(USER_INFO)).roles}`
    // }
    return req;
})

export const api = axios.create({baseURL : "http://localhost:3500"}) // prelogin api


// export const signIn = (data) => API.post("/auth/signin", data)
// export const signInGoogle = (accessToken) => API.post("/auth/signin", {
//     googleAccessToken: accessToken
// })

// export const signUp = (data) => API.post("/auth/signup", data)
// export const signUpGoogle = (accessToken) => API.post("/auth/signup", {
//     googleAccessToken: accessToken
// })