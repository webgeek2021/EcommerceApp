
import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
    name : "category",
    initialState : {
        categoryList :[],
    },
    reducers: {
        setCategoryList : (state ,action) => {
            state.categoryList = action.payload
        }
    }
})



// Action creators are generated for each case reducer function
export const { setCategoryList} = categorySlice.actions

export default categorySlice.reducer