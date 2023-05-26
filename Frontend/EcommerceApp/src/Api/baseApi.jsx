
import axios from "axios"

export const API = axios.create({baseURL:"http://localhost:3500"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("user_info")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user_info").token)}`
    }

    return req;
})

// export const signIn = (data) => API.post("/auth/signin", data)
// export const signInGoogle = (accessToken) => API.post("/auth/signin", {
//     googleAccessToken: accessToken
// })

// export const signUp = (data) => API.post("/auth/signup", data)
// export const signUpGoogle = (accessToken) => API.post("/auth/signup", {
//     googleAccessToken: accessToken
// })