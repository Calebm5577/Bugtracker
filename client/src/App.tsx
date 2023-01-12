import { Counter } from "./features/counter/Counter";
import { selectValue } from "./features/changetext/ChangetextSlice";
import {
  statusMessage,
  currentuser,
  updateUser,
} from "./features/Auth/authSlice";
import "./App.css";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { testLogin } from "./features/Auth/authSlice";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  redirect,
  useLocation,
  Navigate,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { FileWatcherEventKind } from "typescript";
//pages
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Header } from "./components/Header";
import { useVerifyQuery } from "./features/api/endpoints/authEndpoints";
// import React from "react";

function App() {
  // hello value from state
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectValue);
  const status2 = useAppSelector(statusMessage);
  const user = useAppSelector(currentuser);
  // const navigate = useNavigate();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  // let location = useLocation();

  // const user = useAppSelector(currentuser);
  const dispatch = useAppDispatch();
  console.log("this is user in require auth");
  const { isError, isLoading, data, error, isSuccess } = useVerifyQuery({
    arguments: "",
  });

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (data) {
    console.log(data);
    dispatch(updateUser(data));
  }

  if (error) {
    console.log("isError happened");
    console.log(isError);
    console.log(error);
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <>
        {/* <Navigate to="/login" state={{ from: location }} replace />; */}
        <Navigate to="/login" />;
      </>
    );
  }

  return children;
}

function RequireNoAuth({ children }: { children: JSX.Element }) {
  // let location = useLocation();
  const user = useAppSelector(currentuser);
  console.log(user);
  console.log("this is user in require no auth");

  if (user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <>
        <Navigate to="/dashboard" />;
      </>
    );
  }

  return children;
}

export default App;
