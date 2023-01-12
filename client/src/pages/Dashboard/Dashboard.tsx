import React from "react";
import {
  useSignInMutation,
  useSignUpMutation,
  useVerifyQuery,
} from "../../features/api/endpoints/authEndpoints";
import { extendedApi } from "../../features/api/endpoints/authEndpoints";
import { currentuser, updateUser } from "../../features/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Navigate, useNavigate } from "react-router-dom";

//

// jsx stuff
import { SideBar } from "./DashboardComponents/SideBar/SideBar";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(currentuser);
  const [trigger, { isLoading, isError, data, error }] =
    extendedApi.endpoints.test.useLazyQuery();

  //check is logged in
  const {
    isError: loginIsError,
    isLoading: loginIsLoading,
    data: loginData,
    error: loginError,
    isSuccess: loginSuccess,
  } = useVerifyQuery({
    arguments: "",
  });

  if (loginIsLoading) {
    return <div>Checking login status...</div>;
  }

  // loginError && loginIsError are still true after loggin attempt failed
  // and no refresh, ie getting redirected and immediatley signing in will work
  // but you wont redirect like you are supposed too , thus added !user

  if (loginError && loginIsError && !user) {
    //alert toasties
    console.log("right before error");
    return <Navigate to="/login" />;
  }

  if (loginSuccess && loginData) {
    console.log("user is logged in");
    //dispatch(loginData)
    console.log(loginData);
    dispatch(updateUser(loginData));
  }

  /// continue if is logged in

  const testFunc = async () => {
    try {
      await trigger("").unwrap();
    } catch (e) {
      console.log(`uh oh error: ${e}`);
    }
  };

  if (isLoading) {
    console.log("isloadign");
    console.log(isLoading);
  }

  if (isError) {
    console.log("isError");

    console.log(isError);
  }

  if (data) {
    console.log("data");
    console.log(data);
  }

  if (error) {
    console.log("error");
    console.log(error);
  }

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <div style={{ display: "flex" }}>
        <SideBar />
        {/* <p>Test this function!</p>
        <button style={{ height: "35px" }} onClick={() => testFunc()}>
          Test
        </button> */}
        <div>
          <p>the is the user: {user ? user : "none"}</p>
        </div>
      </div>
    </div>
  );
};
