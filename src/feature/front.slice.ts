import { createSlice } from "@reduxjs/toolkit"

export const frontSlice = createSlice({
    name: "Front",
    initialState: {},
    reducers: {
        setfront: (state, action) => {
            state.front = action.payload
        }
    }
})

export const { setfront } = frontSlice.actions
export default frontSlice.reducer