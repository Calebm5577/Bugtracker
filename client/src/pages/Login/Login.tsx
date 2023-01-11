import { useState, useEffect, EffectCallback, ReactElement } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  statusMessage,
  testLogin,
  // Signup,
  // Signin,
  // Signout,
  loading,
  error,
  updateUser,
} from "../../features/Auth/authSlice";
import {
  goodbye,
  selectValue,
} from "../../features/changetext/ChangetextSlice";
import React, { ChangeEvent } from "react";
import { useNavigate, redirect, useLocation, Navigate } from "react-router-dom";
//import from extended auth endpoint
import {
  useSignInMutation,
  useSignUpMutation,
  useVerifyQuery,
} from "../../features/api/endpoints/authEndpoints";
import { Outlet } from "react-router-dom";

type Props = {};

export const Login = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectValue);
  const status2 = useAppSelector(statusMessage);
  const pending = useAppSelector(loading);
  // const errored = useAppSelector(error);

  //mutations
  const [thisIsSignIn, { isLoading, isSuccess, data, isError, error }] =
    useSignInMutation();
  // const [thisIsSignIn] = useSignInMutation();

  const [
    thisIsSignUp,
    {
      isLoading: signupLoading,
      isSuccess: signupSucces,
      data: signupData,
      isError: signupIsError,
      error: signupError,
    },
  ] = useSignUpMutation();

  /// LOCAL STATE ////
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

  const [isRegister, setIsRegister] = useState(false);

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

  //can save
  //   const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  //dispatches then redirects to login
  // const SignoutFunc = () => {
  //   dispatch(Signout());
  //   return navigate("/login");
  // };

  const SigninFunc = async () => {
    try {
      // await dispatch(Signin({ ...auth2 })).unwrap();
      let signin = await thisIsSignIn({ ...auth2 }).unwrap();
      console.log("about to update user");
      dispatch(updateUser(signin));
      console.log("after update user");
    } catch (error) {
      console.log(error);
    } finally {
      console.log(`data ${data}`);
      console.log("we made it in signin func");
      // set requestStatus('idle')
      console.log(isSuccess);
      navigate("/");
    }
  };

  const SignupFunc = async () => {
    try {
      // await dispatch(Signin({ ...auth2 })).unwrap();
      let signup = await thisIsSignUp({ ...auth }).unwrap();

      dispatch(updateUser(signup));
    } catch (error) {
      console.log("signup error");
      console.log(error);
    } finally {
      console.log(`data ${data}`);
      console.log("we made it in signup func");
      // set requestStatus('idle')
      console.log(isSuccess);
      console.log("gonna navigate to dashboard now");
      navigate("/dashboard");
    }
  };

  //.unwrap() explained:
  // .unwrap() function to the returned Promise, which will return a new Promise
  // that either has the actual action.payload value from a fulfilled action,
  // or throws an error if it's the rejected action. This lets us handle success and
  // failure in the component using normal try/catch logic. So, we'll clear out the
  // input fields to reset the form if the post was successfully created, and log
  // the error to the console if it failed.
  // https://redux.js.org/tutorials/essentials/part-5-async-logic

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
  if (data || signupData) {
    console.log("yay data");
    console.log(data || signupData);
    // navigate("/dashboard");
    // return <Navigate to="/dashboard" />;
  }
  if (isLoading || signupLoading) {
    console.log("isLoading");
    return <div>...Loading</div>;
  }

  if (error || signupError) {
    alert("something went wrong");
  }

  if (isRegister) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontSize: "calc(10px + 2vmin)",
        }}
      >
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
          // onClick={() => dispatch(Signup({ ...auth }))}
          onClick={() => SignupFunc()}
        />
        <p>
          Already signed up? click
          <button onClick={() => setIsRegister(false)}>here</button> to sign in
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontSize: "calc(10px + 2vmin)",
        }}
      >
        <h1>signin form</h1>

        {/* Test Login */}
        {/* <button onClick={() => dispatch(testLogin())}>test</button>
        <h1>{status2}</h1> */}

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

        {/* <input
          type="submit"
          style={{ maxWidth: "100px" }}
          onClick={() => navigate("/dashboard")}
        /> */}

        <p>
          Don't have an account? click
          <button onClick={() => setIsRegister(true)}> here</button> to sign up
        </p>
        {/* Sign out */}

        {/* <h1>Signout</h1> */}
        {/* <button onClick={SignoutFunc}>Signout</button> */}
      </div>
      <Outlet />
    </div>
  );
};
