import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './slices/authSlice'
export default configureStore({
  reducer: {
    auth:authSliceReducer
  },
})