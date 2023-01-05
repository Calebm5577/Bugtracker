import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { selectValue } from "./features/changetext/ChangetextSlice";
import { statusMessage } from "./features/Auth/authSlice";
import "./App.css";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  goodbye,
  addToSentance,
  converse,
} from "./features/changetext/ChangetextSlice";
import { testLogin } from "./features/Auth/authSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//pages
import { Login } from "./pages/Login/Login";

function App() {
  // hello value from state
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectValue);
  const status2 = useAppSelector(statusMessage);
  return (
    <Router>
      {/* <div className="App">
        <header className="App-header">
          <Counter />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <button onClick={() => dispatch(goodbye())}>
            {" "}
            {value == "Hello" ? "Say Goodbye" : "Say Hello"}
          </button>
          <h1>Test login</h1>

          <button onClick={() => dispatch(testLogin())}>test</button>
          <h1>{status2}</h1>
        </header>
      </div> */}
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
