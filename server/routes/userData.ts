import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
const {
  createWorkspace,
  getWorkspaces,
  getUserData,
  getNotifications,
} = require("../controllers/userData");
const { protect } = require("../middleware/authMiddleware");

router.route("/createWorkspace").post(protect, createWorkspace);
router.route("/getWorkspaces").get(protect, getWorkspaces);
router.route("/getUserData").get(protect, getUserData);
router.route("/getNotifications").get(protect, getNotifications);

module.exports = router;
