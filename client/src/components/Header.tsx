import React from "react";
import { useAppDispatch } from "../app/hooks";
import {
  statusMessage,
  testLogin,
  Signup,
  Signin,
  // Signout,
} from "../features/Auth/authSlice";
import { useSignOutQuery } from "../features/api/endpoints/authEndpoints";
import { useNavigate, redirect, useLocation } from "react-router-dom";
import { extendedApi } from "../features/api/endpoints/authEndpoints";
import { apiSlice } from "../features/api/apiSlice";
import { logoutUser } from "../features/Auth/authSlice";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [trigger, result, lastPromiseInfo] = extendedApi.endpoints.signOut.useLazyQuery()
  const [trigger, { isLoading, isError, data, error }] =
    extendedApi.endpoints.signOut.useLazyQuery();
  // const [trigger, { isLoading, isError, data, error }] =
  //   apiSlice.endpoints.signOut.useLazyQuery();
  // const [trigger, result, lastPromiseInfo] = apiSlice.endpoints.getPosts.useLazyQuery
  // const navigate = useNavigate();

  const SignoutFunc = async () => {
    // dispatch(Signout());
    try {
      let logout = await trigger("").unwrap();
      dispatch(logoutUser());
    } catch (e) {
      console.log(`error ${JSON.stringify(e)}`);
    } finally {
      navigate("/login");
    }
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }
  if (isError) {
    console.log(`is error: ${isError}`);
  }
  if (isError) {
    console.log(`is error: ${isError}`);
  }
  if (error) {
    console.log(`justt error error: ${JSON.stringify(error)}`);
  }
  return (
    <div>
      <h3>Header</h3>
      <button onClick={SignoutFunc}>Signout</button>
    </div>
  );
};
