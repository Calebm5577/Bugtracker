import React from "react";
import { useVerifyQuery } from "../../features/api/endpoints/authEndpoints";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { updateUser } from "../../features/Auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthLoader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log("this is user in require auth");
  const { isError, isLoading, data, error, isSuccess } = useVerifyQuery({
    arguments: "",
  });
  // if (isLoading) {
  //   return <div>...Loading</div>;
  // }

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
    return navigate("/login");
  }
};
