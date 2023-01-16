import React, { Children } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { AuthLoader } from "./routing/loaders/AuthLoader";
import { Server } from "./pages/Server/Server";
import { Home } from "./pages/Home/Home";

// //require Auth
// const requireAuth = () => {
//   const isAuthenticated = store.getState().commonData.isAuthenticaticated;
//   if (isAuthenticated) return true;
//   console.error("No auth, redirect to /auth");
//   throw redirect("/auth");
// };
// react router dom
const router = createBrowserRouter([
  {
    // path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: AuthLoader,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "server",
            element: <Server />,
          },
          {
            path: "home",
            element: <Home />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
