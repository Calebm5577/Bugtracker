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

const protect = async (req: ReqParams, res: Response, next: NextFunction) => {
  let token = req.body.token;

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
      // throw new Error("Not authorized");
    }
    res.status(400).json({ message: "something went wrong" });
  }

  if (!token) {
    res.status(401);
    // throw new Error("Not authorized, no token");
  }
};

module.exports = { protect };
