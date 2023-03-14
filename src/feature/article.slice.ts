import { createSlice } from "@reduxjs/toolkit"

export const articlesSlice = createSlice({
    name: "Articles",
    initialState: {},
    reducers: {
        setArticles: (state, action) => {
            state.articles = action.payload
        }
    }
})

export const { setArticles } = articlesSlice.actions
export default articlesSlice.reducer