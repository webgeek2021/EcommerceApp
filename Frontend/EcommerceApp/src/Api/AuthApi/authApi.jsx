import { AUTH } from "../../utils/constants"
import { API } from "../baseApi"

import { AuthUser, LogOutUser } from "../../ReduxStore/slices/authSlice.jsx"
import { toast } from "react-toastify"

// export const signUp = (data) => API.post("/auth/signup", data)
// export const signUpGoogle = (accessToken) => API.post("/auth/signup", {
//     googleAccessToken: accessToken
// })
export const loadUser = () => async (dispath) => {
    const localUser = JSON.parse(localStorage.getItem("user_info"))

    if (localUser) {
        dispath({ type: AUTH, data: localUser })
    }
}

export const signIn = (data2, navigate) => {
    return async (dispatch) => {

        try {
            const {data}  = await API.post("/auth/signin", data2)
            console.log("Sign in ", data)
            if(!data.error){
                toast.success(data.message)
            }
            dispatch(AuthUser(data))
            if(data.role.Admin){
                navigate("/admin")
            }else{
                navigate("/")
            }


        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Something Went Wrong"
            )
            console.log(err);
        }
    }
}

export const signInGoogle = (accessToken, navigate) => async (dispatch) => {
    try {
        // login user
        const { data } = await API.post("/auth/signin", {
            googleAccessToken: accessToken
        })
        console.log("Sign In Google", data);
        console.log(AuthUser)

        dispatch(AuthUser(data))
        navigate("/")

    } catch (err) {
        console.log(err)
        toast.error(
            err?.response?.data?.message || "Something Went Wrong"
        )
    }
}

export const signUp = (formData, navigate) =>  {
    return async (dispatch) => {
    try {
        // signup user
        console.log("SingUp Form Data", formData)
        const { data } = await API.post("/auth/signup", formData)
        console.log("Sign Up", data)

        dispatch(AuthUser(data))
        navigate("/")

    } catch (err) {
        // tostify
        console.log(err)
        toast.error(
            err?.response?.data?.message || "Something Went Wrong"
        )
    }
}}

export const signUpGoogle = (accessToken, navigate) => async (dispatch) => {
    try {
        // signup user
        console.log("SIGN UP GOOGLE", accessToken)
        const { data } = await API.post("/auth/signup", {
            googleAccessToken: accessToken
        })
        console.log("Sign Up Google", data)

        dispatch(AuthUser(data))
        navigate("/")

    } catch (err) {
        console.log(err)
        toast.error(
            err?.response?.data?.message || "Something Went Wrong"
        )
    }
}