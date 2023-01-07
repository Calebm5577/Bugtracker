import { useState, useEffect, EffectCallback, ReactElement } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  statusMessage,
  testLogin,
  Signup,
  Signin,
  Signout,
  loading,
  error,
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
  const pending = useAppSelector(loading);
  const errored = useAppSelector(error);

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
  //useEffect
  // useEffect(()  => {
  //   if (pending) {
  //     return (
  //       // <div>
  //       //   ...Loading
  //       // </div>
  //       console.log()
  //     )
  //   }
  // }, [pending]);

  //can save
  //   const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  //dispatches then redirects to login
  const SignoutFunc = () => {
    dispatch(Signout());
    return navigate("/login");
  };

  const SigninFunc = async () => {
    try {
      await dispatch(Signin({ ...auth2 })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("we made it");
      // set requestStatus('idle')
      navigate("/dashboard");
    }
  };

  //.unwrap() =
  // .unwrap() function to the returned Promise, which will return a new Promise
  // that either has the actual action.payload value from a fulfilled action,
  // or throws an error if it's the rejected action. This lets us handle success and
  // failure in the component using normal try/catch logic. So, we'll clear out the
  // input fields to reset the form if the post was successfully created, and log
  // the error to the console if it failed.

  // const SigninFunc = () => {
  //   dispatch(Signin({ ...auth2 }))
  //     .unwrap()
  //     .then(() => navigate("/dashboard"))
  //     .catch((error) => "handle error");
  // };

  // if (user) return (
  //   <>
  //     <Navigate to="/dashboard"
  //   </>
  // )

  if (pending) {
    return <div>...Loading</div>;
  }

  if (errored) {
    alert("something went wrong");
  }

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
            onClick={() => SigninFunc()}
          />

          <input
            type="submit"
            style={{ maxWidth: "100px" }}
            onClick={() => navigate("/dashboard")}
          />

          {/* Sign out */}

          <h1>Signout</h1>
          <button onClick={SignoutFunc}>Signout</button>
        </header>
      </div>
    </div>
  );
};
