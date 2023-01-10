import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
const { test } = require("../controllers/test");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, test);

module.exports = router;
