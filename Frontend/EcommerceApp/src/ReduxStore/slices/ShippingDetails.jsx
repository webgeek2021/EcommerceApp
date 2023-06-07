import { createSlice } from "@reduxjs/toolkit";

export const ShippingDetails = createSlice({
    name : "ShippingDetails",
    initialState : {
        country : "",
        address : "",
        state : "",
        postalCode : "",
        city : "",
    },
    reducers :{
        addShippingDetails : (state, action)=>{
            
        }
    }
})