import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Shop from "./Component/Shop/Shop.jsx";
import Orders from "./Component/Orderss/Orders.jsx";
import Inventory from "./Component/Inventory/Inventory.jsx";
import Login from "./Component/Loginpage/Login.jsx/Login.jsx";
import CardProductLoadewr from "./CardProductLoader/CardProductLoader.js";
import ProceedChackout from "./Component/ProceedChackout/ProceedChackout.jsx";
import ErrorPage from "./Component/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/orders",
        element: <Orders />,
        loader: CardProductLoadewr,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "proceedCheckout",
        element: <ProceedChackout />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
