import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
const { deleteBug, editBugTitle } = require("../controllers/editBugs");
const { protect } = require("../middleware/authMiddleware");

router.route("/deleteBug").post(protect, deleteBug);
router.route("/editBugTitle").post(protect, editBugTitle);

module.exports = router;
