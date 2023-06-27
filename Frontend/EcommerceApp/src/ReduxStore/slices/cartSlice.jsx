
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { CART } from '../../utils/constants'
export const cartSlice = createSlice({
    name : "cart",
    initialState : {
        productList : JSON.parse(localStorage.getItem(CART))?.productList || [],
        showCart : false,
        total : JSON.parse(localStorage.getItem(CART))?.total || 0
    },
    reducers: {
        insertProductIntoCart : (state ,action) =>{
            // store data in localstorage
            console.log(action.payload.id)
            console.log(state.productList)
            const arr = state.productList
            const findid = arr.find((obj) => obj.id === action.payload.id)
            console.log(findid)
            if(findid)  {
                toast.info("Product Already exist in Cart")
                return
            }
            state.productList.push(action.payload)
            state.total += (action.payload.price * action.payload.orderQuantity)
            // if(cart){
                const productList= state.productList
                const total = state.total
                const obj = { productList, total}
                localStorage.setItem(CART , JSON.stringify(obj))
            // }
        },
        deleteProductFromCart : (state , action )=>{
            console.log("Delete",action.payload)
            const id = action.payload
            console.log("Product List" , state.productList)
            const isExist = state.productList.find((obj) => obj.id === id)
            console.log("IsExist" , isExist)
            if(isExist){
                state.total -=( isExist.price * isExist.orderQuantity)
                const newArr = state.productList.filter((obj) => obj.id !== id)
                state.productList = newArr
                const productList= state.productList
                const total = state.total
                const obj = { productList, total}
                localStorage.setItem(CART , JSON.stringify(obj))
            }

        },
        totalQuantity : (state , action)=>{
            return state.productIds.length()
        },
        setShowCart : (state , action)=>{
            console.log("SjowCart",state)
            state.showCart = !state.showCart
        },
        
        RemoveAll : (state , action)=>{
            state.productList = []
            localStorage.clear(CART)
        }
        
    }
})





// Action creators are generated for each case reducer function
export const { insertProductIntoCart , deleteProductFromCart , setShowCart ,RemoveAll } = cartSlice.actions

export default cartSlice.reducer