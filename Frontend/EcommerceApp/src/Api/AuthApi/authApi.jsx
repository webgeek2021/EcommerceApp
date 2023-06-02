import { AUTH } from "../../utils/constants"
import { preLoginApi, postLoginApi } from "../baseApi.jsx"

import { AuthUser, LogOutUser } from "../../ReduxStore/slices/authSlice.jsx"
import { toast } from "react-toastify"

// export const signUp = (data) => preLoginApi.post("/auth/signup", data)
// export const signUpGoogle = (accessToken) => preLoginApi.post("/auth/signup", {
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
            const { data } = await preLoginApi.post("/auth/signin", data2)
            console.log("Sign in ", data)
            if (!data.error) {
                toast.success(data.message)
                dispatch(AuthUser(data))
                if (data.isAdmin) {
                    navigate("/admin")
                } else {
                    navigate("/")
                }
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
        const { data } = await preLoginApi.post("/auth/signin", {
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

export const signUp = (formData, navigate) => {
    return async (dispatch) => {
        try {
            // signup user
            console.log("SingUp Form Data", formData)
            const { data } = await preLoginApi.post("/auth/signup", formData)
            console.log("Sign Up", data)

            if(!data.error){
                dispatch(AuthUser(data))
                navigate("/")
            }else{
                toast.error(data.error)
            }

        } catch (err) {
            // tostify
            console.log(err)
            toast.error(
                err?.response?.data?.message || "Something Went Wrong"
            )
        }
    }
}

export const signUpGoogle = (accessToken, navigate) => async (dispatch) => {
    try {
        // signup user
        console.log("SIGN UP GOOGLE", accessToken)
        const { data } = await preLoginApi.post("/auth/signup", {
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