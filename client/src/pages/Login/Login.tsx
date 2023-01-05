import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  statusMessage,
  testLogin,
  Signup,
} from "../../features/Auth/authSlice";
import {
  goodbye,
  selectValue,
} from "../../features/changetext/ChangetextSlice";
import React, { ChangeEvent } from "react";

type Props = {};

export const Login = (props: Props) => {
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

  const signin = () => {};

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <header className="App-header">
          {/* <h1>{value}</h1>
          <button onClick={() => dispatch(goodbye())}>
            {" "}
            {value == "Hello" ? "Say Goodbye" : "Say Hello"}
          </button> */}
          <h1>Test login</h1>

          <button onClick={() => dispatch(testLogin())}>test</button>
          <h1>{status2}</h1>

          <h1>signup form</h1>
          {/* <form style={{ display: "flex", flexDirection: "column" }}> */}
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
          {/* </form> */}
        </header>
      </div>
    </div>
  );
};
