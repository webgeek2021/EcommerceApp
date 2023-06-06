
import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie"

export const profileSlice = createSlice({
    name : "profile",
    initialState : {
        name : "",
        address : "",
        pincode : "",
        city : "",
        state : "",
        dob : "",
        country : "",
        email : "",
        id : ""
    },
    reducers : {
        setUserInfo : (state,action)=>{
            console.log("SetUserInfo",action.payload)
            const data = action.payload
            state.name = data.name
            state.dob = data.dob  
            state.email = data.email
            state.id = data.id
        }
    }
})

export const { setUserInfo } = profileSlice.actions

export default profileSlice.reducer