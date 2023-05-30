
import { createSlice } from '@reduxjs/toolkit'
import {AUTH , LOGOUT , USER_INFO} from "../../utils/constants"

export const authSlice = createSlice({
    name : "auth",
    initialState : {
        authData : null,
    },
    reducers: {
        AuthUser : (state ,action) =>{
            const data = action.payload;
            console.log("Auth action Data"  , data)
            const userInfo = {
                name : data.name,
                email : data.email,
                token : data.token,
                roles : data.roles || data.role,
            }
            localStorage.setItem(USER_INFO , JSON.stringify(userInfo));
            console.log("AuthUSer " , userInfo)
            state.authData = userInfo
        },
        LogOutUser : (state , action )=>{
            console.log("Log State"  , state)
            console.log("Log action"  , action)
            localStorage.clear();
        },
        
    }
})





console.log("AUTHSLICE" , authSlice.actions)
// Action creators are generated for each case reducer function
export const { AuthUser , LogOutUser} = authSlice.actions

export default authSlice.reducer