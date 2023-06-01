import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './slices/authSlice'
import cartSliceReducer from "./slices/cartSlice"
import productDataSliceReducer from './slices/productDataSlice'

export default configureStore({
  reducer: {
    auth:authSliceReducer,
    cart : cartSliceReducer,
    productData : productDataSliceReducer 
  },
})