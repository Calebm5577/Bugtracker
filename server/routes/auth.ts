// import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
const { signin, signup, logout } = require("../controllers/auth");

router.get("/signin", signin);
router.post("/signup", signup);
router.get("/logout", logout);
module.exports = router;
