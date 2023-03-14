import { createSlice } from "@reduxjs/toolkit"

export const footerSlice = createSlice({
    name: "Footer",
    initialState: {},
    reducers: {
        setFooter: (state, action) => {
            state.footer = action.payload
        }
    }
})

export const { setFooter } = footerSlice.actions
export default footerSlice.reducer