
import { createSlice } from '@reduxjs/toolkit'
import {AUTH , LOGOUT} from "../../utils/constants"

export const authSlice = createSlice({
    name : "auth",
    initialState : {
        authData : null,
    },
    reducers: {
        AuthUser : (state ,action) =>{
            console.log("Auth State"  , state)
            console.log("Auth action"  , action)
            const data = action.payload;
            const userInfo = {
                
            }
            localStorage.setItem("user_info" , JSON.stringify({...action?.payload}));
            console.log("AuthUSer " , action.payload)
            
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