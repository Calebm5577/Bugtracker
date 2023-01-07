import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { selectValue } from "./features/changetext/ChangetextSlice";
import { statusMessage, currentuser } from "./features/Auth/authSlice";
import "./App.css";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  goodbye,
  addToSentance,
  converse,
} from "./features/changetext/ChangetextSlice";
import { testLogin } from "./features/Auth/authSlice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { FileWatcherEventKind } from "typescript";
//pages
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Header } from "./components/Header";

function App() {
  // hello value from state
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectValue);
  const status2 = useAppSelector(statusMessage);
  const user = useAppSelector(currentuser);
  // const navigate = useNavigate();

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route
            path="/login"
            element={
              <RequireNoAuth>
                <Login />
              </RequireNoAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
            // loader={async () => {
            //   if (!user) {
            //     throw redirect("/login");
            //   }
            //   return { user };
            // }}
          />
        </Routes>
      </Router>
    </>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  // let location = useLocation();
  const user = useAppSelector(currentuser);

  if (!user) {
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
