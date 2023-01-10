import React from "react";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../../features/api/endpoints/authEndpoints";
import { extendedApi } from "../../features/api/endpoints/authEndpoints";
import { currentuser } from "../../features/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
interface Props {}

export const Dashboard = () => {
  // const {} = props;
  const [trigger, { isLoading, isError, data, error }] =
    extendedApi.endpoints.test.useLazyQuery();

  const user = useAppSelector(currentuser);

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
      <p>Test this function!</p>
      <button onClick={() => testFunc()}>Test</button>
      <p>the is the user: {user ? user : "none"}</p>
    </div>
  );
};
