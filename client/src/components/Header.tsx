import React from "react";
import { useAppDispatch } from "../app/hooks";
import {
  statusMessage,
  testLogin,
  Signup,
  Signin,
  Signout,
} from "../features/Auth/authSlice";
import { useNavigate, redirect, useLocation } from "react-router-dom";

export const Header = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const SignoutFunc = () => {
    dispatch(Signout());
    // navigate("/login");
    console.log("made it ");
  };
  return (
    <div>
      <h3>Header</h3>
      <button onClick={SignoutFunc}>Signout</button>
    </div>
  );
};
