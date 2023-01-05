import { Request, Response, NextFunction, application } from "express";
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// generatetoken id interface
interface id {
  user: {
    id: String;
  };
}

const signin = async (req: Request, res: Response) => {
  res.send("Hello World!");
};

const signup = async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  //check if user email exists
  let checkuser = await User.findOne({ email: req.body.email });

  let salt = await bcrypt.genSaltSync(10);
  let hash = await bcrypt.hashSync(req.body.password, salt);

  console.log(checkuser);
  if (!checkuser) {
    try {
      console.log("step one");
      let newUser = await User.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
      });
      console.log("step two");
      if (newUser) {
        res.cookie("auth-token", "", {
          httpOnly: false,
          sameSite: "lax",
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        });

        console.log("after cookie");
        console.log(newUser);
        res.status(200).json({ ...newUser });
        // res.status(200).json({ message: "success" });
      }
    } catch (e) {
      res.status(402).json({ message: "something went wrong" });
    }
  } else {
    res.status(401).json({ message: "email address already in use" });
  }
};

const logout = async (req: Request, res: Response) => {
  res.send("Hello World!");
};

const generateToken = (id: id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// const assignCookies = (token: String, req, res) => {

// }

module.exports = { signin, signup, logout };
