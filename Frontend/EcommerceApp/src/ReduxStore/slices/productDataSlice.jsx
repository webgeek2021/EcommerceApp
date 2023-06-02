
import { createSlice } from "@reduxjs/toolkit";

export const productDataSlice = createSlice({
    name : "productData",
    initialState : {
        productData : null,
        productList : []
    },
    reducers : {
        insertProductData : (state , action)=>{
            console.log("Insert Prodcut Data" , action.payload)
            if(action?.payload){
                state.productData = action.payload
            }
        },
        insertIntoProductList : (state , action) =>{
            console.log("ProductList",action.payload)
            const arr = state.productList
            if(action.payload.id){
                const findid = arr.find((obj) => obj.id === action.payload.id)
                if(!findid)
                    state.productList.push(action.payload)
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { insertProductData , insertIntoProductList} = productDataSlice.actions

export default productDataSlice.reducer