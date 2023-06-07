
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const cartSlice = createSlice({
    name : "cart",
    initialState : {
        productList : [],
        showCart : false,
        total : 0
    },
    reducers: {
        insertProductIntoCart : (state ,action) =>{
            // store data in localstorage
            console.log(action.payload.id)
            
            const arr = state.productList
            const findid = arr.find((obj) => obj.id === action.payload.id)
            console.log(findid)
            if(findid)  {
                toast.info("Product Already exist in Cart")
                return
            }
            state.productList.push(action.payload)
            state.total += (action.payload.price * action.payload.orderQuantity)
        },
        deleteProductFromCart : (state , action )=>{
            console.log("Delete",action.payload)
            const id = action.payload
            const isExist = state.productList.find((obj) => obj.id === id)
            console.log("IsExist" , isExist)
            if(isExist){
                state.total -= isExist.price
                const newArr = state.productList.filter((obj) => obj.id !== id)
                state.productList = newArr
            }
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
        },
        RemoveAll : (state , action)=>{
            state.productList = []
        }
        
    }
})





// Action creators are generated for each case reducer function
export const { insertProductIntoCart , deleteProductFromCart , setShowCart , deleteFromCart,RemoveAll } = cartSlice.actions

export default cartSlice.reducer