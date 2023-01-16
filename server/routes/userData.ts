import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
const {
  createWorkspace,
  getWorkspaces,
  getUserData,
  getNotifications,
  acceptOrDenyNotificatons,
} = require("../controllers/userData");
const { protect } = require("../middleware/authMiddleware");

router.route("/createWorkspace").post(protect, createWorkspace);
router.route("/getWorkspaces").get(protect, getWorkspaces);
router.route("/getUserData").get(protect, getUserData);
router.route("/getNotifications").get(protect, getNotifications);
router
  .route("/acceptOrDenyNotificatons")
  .post(protect, acceptOrDenyNotificatons);

module.exports = router;
