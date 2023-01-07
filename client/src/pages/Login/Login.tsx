import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  statusMessage,
  testLogin,
  Signup,
  Signin,
  Signout,
} from "../../features/Auth/authSlice";
import {
  goodbye,
  selectValue,
} from "../../features/changetext/ChangetextSlice";
import React, { ChangeEvent } from "react";
import { useNavigate, redirect, useLocation } from "react-router-dom";

type Props = {};

export const Login = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectValue);
  const status2 = useAppSelector(statusMessage);

  //login user state
  const [auth, setAuth] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [auth2, setAuth2] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let name = event.target.name;

    setAuth((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let name = event.target.name;

    setAuth2((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  //dispatches then redirects to login
  const SignoutFunc = () => {
    dispatch(Signout());
    return navigate("/login");
  };

  const SignupFunc = () => {
    dispatch(Signin({ ...auth2 }));
    navigate("/dashboard");
  };

  // if (user) return (
  //   <>
  //     <Navigate to="/dashboard"
  //   </>
  // )

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <header className="App-header">
          <h1>Test login</h1>

          {/* Test Login */}
          <button onClick={() => dispatch(testLogin())}>test</button>
          <h1>{status2}</h1>

          {/* Sign up */}

          <h1>signup form</h1>

          <label>
            {" "}
            Enter your firstName:
            <input
              type="text"
              onChange={handleChange}
              name="firstName"
              value={auth.firstName}
            />
          </label>
          <label>
            {" "}
            Enter your lastName:
            <input
              type="text"
              onChange={handleChange}
              name="lastName"
              value={auth.lastName}
            />
          </label>
          <label>
            {" "}
            Enter your email:
            <input
              type="text"
              onChange={handleChange}
              name="email"
              value={auth.email}
            />
          </label>
          <label>
            {" "}
            Enter your password:
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={auth.password}
            />
          </label>
          <input
            type="submit"
            style={{ maxWidth: "100px" }}
            onClick={() => dispatch(Signup({ ...auth }))}
          />

          {/* Sign in */}

          <input
            placeholder="email"
            onChange={handleChange2}
            name="email"
            value={auth2.email}
          />
          <input
            placeholder="password"
            onChange={handleChange2}
            name="password"
            value={auth2.password}
          />
          <input
            type="submit"
            style={{ maxWidth: "100px" }}
            onClick={() => SignupFunc()}
          />

          {/* Sign out */}

          <h1>Signout</h1>
          <button onClick={SignoutFunc}>Signout</button>
        </header>
      </div>
    </div>
  );
};
