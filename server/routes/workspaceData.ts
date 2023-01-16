import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
const {
  createBugBoard,
  createBug,
  getBugs,
  inviteWorkspaceMember,
} = require("../controllers/workspaceData");
const { protect } = require("../middleware/authMiddleware");

router.route("/createBugBoard").post(protect, createBugBoard);
router.route("/createBug").post(protect, createBug);
router.route("/getBugs").post(protect, getBugs);
router.route("/inviteWorkspaceMember").post(protect, inviteWorkspaceMember);

module.exports = router;
