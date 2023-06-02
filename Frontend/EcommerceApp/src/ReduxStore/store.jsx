import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './slices/authSlice'
import cartSliceReducer from "./slices/cartSlice"
import productDataSliceReducer from './slices/productDataSlice'
import Cookie from "js-cookie"
import { USER_INFO } from '../utils/constants'



export default configureStore({
  reducer: {
    auth:authSliceReducer,
    cart : cartSliceReducer,
    productData : productDataSliceReducer 
  }
})