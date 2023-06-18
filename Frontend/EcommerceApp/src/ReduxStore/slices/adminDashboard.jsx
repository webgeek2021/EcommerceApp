
import { createSlice } from '@reduxjs/toolkit'

export const adminDashboardSlice = createSlice({
    name : "admin",
    initialState : {
        totalEarning : 0,
    },
    reducers: {
        setTotalEarning : (state ,action) => {
            console.log("Action Total" ,action.payload)
            state.totalEarning = action.payload
        }
    }
})



// Action creators are generated for each case reducer function
export const { setTotalEarning} = adminDashboardSlice.actions

export default adminDashboardSlice.reducer