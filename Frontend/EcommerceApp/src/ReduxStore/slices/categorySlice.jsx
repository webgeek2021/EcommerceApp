
import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
    name : "category",
    initialState : {
        categoryList :[],
        subCategoryList : [],
        subCategory : []
    },
    reducers: {
        setCategoryList : (state ,action) => {
            state.categoryList = action.payload
        },
        setCategorySubList : (state,action)=>{
           if(action.payload){
            console.log("INCLUDES" , state.subCategory.includes(action.payload))
            const findCategory = state.subCategory.find((cat)=>cat.category === action.payload.category)
            if(!findCategory)
            state.subCategory.push(action.payload)
           }
        }
    }
})



// Action creators are generated for each case reducer function
export const { setCategoryList , setCategorySubList} = categorySlice.actions

export default categorySlice.reducer