import { Request, Response, NextFunction, application } from "express";
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Workspace = require("../models/workspace");
// import {User} from '../models/user'
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const asyncHandler = require("express-async-handler");

// const ValidationError = require("../middleware/error/error.handler.middleware");

// generatetoken id interface
interface id {
  user: {
    id: String;
  };
}

const signin = asyncHandler(async (req: Request, res: Response) => {
  console.log("start");
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    throw new Error("Use all feilds");
  }

  let checkuser = await User.findOne({ email: req.body.email });

  if (checkuser) {
    try {
      const { password, ...user } = checkuser._doc;

      let checkPassword = await bcrypt.compareSync(req.body.password, password);
      console.log("made it past let checkpassword");

      if (checkPassword) {
        console.log("made it inside checkpassword");

        let AccessToken = generateAccessToken(user);
        let RefreshToken = generateRefreshToken(user);

        res.cookie("auth-token", AccessToken, {
          httpOnly: false,
          sameSite: "lax",
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        });
        console.log("made it passed res.cookie");

        res.status(200).json({ message: "success", RefreshToken });
      } else {
        res.status(400);
        throw new Error("something went wrong 2");
      }
    } catch (e) {
      res.status(400);
      console.log(e);
      throw new Error("something went wrong");
    }
  } else {
    res.status(400);
    throw new Error("user does not exist");
  }

  // res.send("Hello World!");
});

const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
        let AccessToken = generateAccessToken(newUser._id);
        let RefreshToken = generateRefreshToken(newUser._id);
        if (newUser) {
          res.cookie("auth-token", AccessToken, {
            httpOnly: false,
            sameSite: "lax",
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
          });

          console.log("after cookie");
          console.log(newUser);
          res
            .status(200)
            .json({ message: "account created successfully", RefreshToken });
        }
      } catch (e) {
        res.status(400).json({ message: "something went wrong" });
      }
    } else {
      // res.status(401).json({ message: "email address already in use" });
      res.status(400);
      throw new Error("already in use");
      // next();
    }
  }
);

const signout = async (req: Request, res: Response) => {
  res.cookie("auth-token", "", {
    httpOnly: false,
    sameSite: "lax",
    expires: new Date(Date.now() - 1000),
  });
  res.status(200).json({ message: "success" });
};

// const verify = asyncHandler(async (req: Request, res: Response) => {
//   ///doing token stufff
//   console.log(req.header);
//   console.log(req.headers);
//   const authHeader = String(req.headers["authorization"] || "");
//   console.log(authHeader);
//   if (authHeader.startsWith("Bearer ")) {
//     const token = authHeader
//       .substring(7, authHeader.length)
//       .replace(/['"]+/g, ""); // removes quotes, may already be removed on client, does no harm if so
//     console.log(`token ${token}`);

//     if (token) {
//       const decoded = jwt.verify(token, process.env.REFRESH_JWT_SECRET);
//       console.log(decoded);
//       console.log(decoded);
//       res.status(200).json({ message: "success" });
//     } else {
// res.cookie("auth-token", "", {
//   httpOnly: false,
//   sameSite: "lax",
//   expires: new Date(Date.now() - 1000),
// });
//       res.status(400);
//       throw new Error("no token inside bearer");
//     }
//   } else {
//     res.cookie("auth-token", "", {
//       httpOnly: false,
//       sameSite: "lax",
//       expires: new Date(Date.now() - 1000),
//     });
//     res.status(400);
//     throw new Error("no bearer token");
//   }
// });

const verify = asyncHandler(async (req: Request, res: Response) => {
  ///doing token stufff
  if (req.headers.cookie) {
    console.log(req.headers.cookie.split("=")[1]);
    let token = req.headers.cookie.split("=")[1];
    try {
      console.log("inside try");
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      console.log(decoded);
      console.log("after decoded");
      res.status(200).json({
        message: "success",
        RefreshToken: req.headers.cookie.split("=")[1],
      });
    } catch (e) {
      console.log("inside error");
      console.log(e);
      res.cookie("auth-token", "", {
        httpOnly: false,
        sameSite: "lax",
        expires: new Date(Date.now() - 1000),
      });
      res.status(400);
      throw new Error(`error: ${e}`);
    }
  } else {
    res.cookie("auth-token", "", {
      httpOnly: false,
      sameSite: "lax",
      expires: new Date(Date.now() - 1000),
    });
    res.status(400);
    throw new Error(`no token`);
  }
});

const generateRefreshToken = (id: id) => {
  return jwt.sign({ ...id }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "30m",
  });
};

const generateAccessToken = (id: id) => {
  return jwt.sign({ ...id }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = { signin, signup, signout, verify };
