
import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
    name : "loading",
    initialState : {
        isLoading : false
    },
    reducers: {
        setIsLoading : (state , action)=>{
            if(state.isLoading){
                state.isLoading = false
            }else{
                state.isLoading = true

            }
        }
    }
})



// Action creators are generated for each case reducer function
export const { setIsLoading} = loadingSlice.actions

export default loadingSlice.reducer