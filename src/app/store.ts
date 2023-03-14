import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../feature/menu.slice";
import footerReducer from "../feature/footer.slice";
import articlesReducer from "../feature/article.slice";

export default configureStore({
  reducer: {
    menu: menuReducer,
    footer: footerReducer,
    articles: articlesReducer
  },
});
