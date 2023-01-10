// import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
const { signin, signup, signout, verify } = require("../controllers/auth");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout", signout);
router.get("/verify", verify);
module.exports = router;
