import { createSlice } from "@reduxjs/toolkit"

export const footerSlice = createSlice({
    name: "Footer",
    initialState: {},
    reducers: {
        setFooter: (state: { [key: string]: any }, action) => {
            state.footer = action.payload
        }
    }
})

export const { setFooter } = footerSlice.actions
export default footerSlice.reducer