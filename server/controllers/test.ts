import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();

const test = async (req: Request, res: Response) => {
  // res.send("Hello World!");
  throw new Error("BROKEN");
};

module.exports = { test };
