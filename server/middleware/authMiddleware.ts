const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
const User = require("../models/user");
import { Request, Response, NextFunction } from "express";

interface ReqParams {
  user: String;
  body: {
    token: String;
  };
}

// const protect = async (req: Request, res: Response, next: NextFunction) => {
//   // console.log(req);
//   // let token = req.body.token;

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
//     }
//   }
//   next();

//   // try {
//   //   // Verify token
//   //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   //   // Get user from the token
//   //   req.user = await User.findById(decoded.id).select("-password");

//   //   next();
//   // } catch (error) {
//   //   if (error instanceof Error) {
//   //     console.log(error.message);
//   //     res.status(400).json({ message: error.message });
//   //     // throw new Error("Not authorized");
//   //   }
//   //   res.status(400).json({ message: "something went wrong" });
//   // }

//   // if (!token) {
//   //   res.status(401);
//   //   // throw new Error("Not authorized, no token");
//   // }
// };

const protect = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  // console.log(req);
  // let token = req.body.token;

  console.log(req.header);
  console.log(req.headers);
  console.log("cookie");
  console.log(req.headers.cookie);
  if (req.headers.cookie) {
    console.log(req.headers.cookie.split("=")[1]);
    let token = req.headers.cookie.split("=")[1];
    try {
      console.log("inside try");
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      console.log(decoded);
      console.log("after decoded");
      req.userDecoded = decoded;
      next();
    } catch (e) {
      console.log("inside error");
      console.log(e);
      res.status(400).json({ message: "something went wrong" });
    }
  } else {
    res.status(400).json({ message: "token expired" });
  }

  // try {
  //   // Verify token
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   // Get user from the token
  //   req.user = await User.findById(decoded.id).select("-password");

  //   next();
  // } catch (error) {
  //   if (error instanceof Error) {
  //     console.log(error.message);
  //     res.status(400).json({ message: error.message });
  //     // throw new Error("Not authorized");
  //   }
  //   res.status(400).json({ message: "something went wrong" });
  // }

  // if (!token) {
  //   res.status(401);
  //   // throw new Error("Not authorized, no token");
  // }
};
module.exports = { protect };
