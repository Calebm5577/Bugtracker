import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();

const test = async (req: Request | any, res: Response) => {
  // res.send("Hello World!");
  // throw new Error("BROKEN");
  console.log("inside test");
  console.log(req.userDecoded);
  console.log("after req.userDecoded");
  res.status(200).json({ message: "succes to test" });
};

module.exports = { test };
