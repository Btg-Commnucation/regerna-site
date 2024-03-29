import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "Menu",
  initialState: {},
  reducers: {
    setMenu: (state: { [key: string]: any }, action) => {
      state.menu = action.payload;
    },
  },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
