import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Article from "./components/Article";
import "./sass/style.scss";
import { Provider } from "react-redux";
import store from "./app/store";
import Page from "./components/Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:slug",
    element: <Page />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/news/:slug",
    element: <Article />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
