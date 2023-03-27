import { createSlice } from '@reduxjs/toolkit'

export const partnersSlice = createSlice({
    name: 'Partners',
    initialState: {
        partners: 'all'
    },
    reducers: {
        setPartners: (state: { [key: string]: string }, action) => {
            state.partners = action.payload
        }
    }
})

export const { setPartners } = partnersSlice.actions
export default partnersSlice.reducer