
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const cartSlice = createSlice({
    name : "cart",
    initialState : {
        productIds : [],
        showCart : false
    },
    reducers: {
        insertProductIntoCart : (state ,action) =>{
            // store data in localstorage
            console.log(action.payload.id)
            
            const arr = state.productIds
            const findid = arr.find((obj) => obj.id === action.payload.id)
            console.log(findid)
            if(findid)  {
                toast.info("Product Already exist in Cart")
                return
            }
            arr.push(action.payload)
        },
        deleteProductFromCart : (state , action )=>{
            
        },
        totalQuantity : (state , action)=>{
            return state.productIds.length()
        },
        setShowCart : (state , action)=>{
            console.log("SjowCart",state)
            state.showCart = !state.showCart
        },
        deleteFromCart  : (state , action)=>{
            
            const prodid = action.payload
            console.log("Delete " ,prodid)
            if(prodid){
                const arr = state.productIds

                const newList = arr.filter((obj) => obj.id !== prodid)
                console.log("NewList" , newList)
                state.productIds = newList
            }

            
        }
        
    }
})





// Action creators are generated for each case reducer function
export const { insertProductIntoCart , deleteProductFromCart , setShowCart , deleteFromCart} = cartSlice.actions

export default cartSlice.reducer