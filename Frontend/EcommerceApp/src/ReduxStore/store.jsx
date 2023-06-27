import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './slices/authSlice'
import cartSliceReducer from "./slices/cartSlice"
import productDataSliceReducer from './slices/productDataSlice'
import ProfileSliceReducer from './slices/ProfileSlice'
import Cookie from "js-cookie"
import OrderSlice from './slices/OrderSlice'
import { USER_INFO } from '../utils/constants'
import adminDashboardReducer from './slices/adminDashboard'
import categoryReducer from "./slices/categorySlice";
import loadingReducer from "./slices/loadingSlice";

export default configureStore({
  reducer: {
    auth:authSliceReducer,
    cart : cartSliceReducer,
    productData : productDataSliceReducer ,
    profile : ProfileSliceReducer,
    orders : OrderSlice,
    admin : adminDashboardReducer,
    category : categoryReducer,
    loading : loadingReducer
  }
})