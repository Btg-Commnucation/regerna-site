import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../feature/menu.slice";
import footerReducer from "../feature/footer.slice";

export default configureStore({
  reducer: {
    menu: menuReducer,
    footer: footerReducer,
  },
});
