
import { createSlice } from '@reduxjs/toolkit'
import {AUTH , LOGOUT , USER_INFO} from "../../utils/constants"
import Cookie from "js-cookie"
export const orderSlice = createSlice({
    name : "orders",
    initialState : {
        orderData : null,
    },
    reducers: {
        setOrderList  :(state , actions)=>{
            state.orderData = actions.payload
        }
    }
})



// Action creators are generated for each case reducer function
export const { setOrderList} = orderSlice.actions

export default orderSlice.reducer