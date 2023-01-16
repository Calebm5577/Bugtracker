import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
// const { User } = require("../models/user");
const Workspace = require("../models/workspace");
const Members = require("../models/members");
const asyncHandler = require("express-async-handler");
const BugBoard = require("../models/bugboard");
const Bug = require("../models/bugs");
const User = require("../models/user");
const Notification = require("../models/notifications");

// const { Notifications } = require("../models/notifications");

//fix req: Request | any

const createBugBoard = async (req: Request | any, res: Response) => {
  try {
    console.log("req body");
    //switch to req.body.sentObj.name
    console.log(req.body.sentObj);
    // console.log(req.userDecoded._id);
    let createNewBoard = await BugBoard.create({
      name: req.body.sentObj.name,
      workspace: req.body.sentObj.workspace,
    });
    // console.log("created bug board");
    console.log(createNewBoard);
    // console.log("getMyWorkspaces");
    // console.log(getMyWorkspaces);
    // const { password, ...user } = checkuser._doc;

    res.status(200).json({
      message: `successfully create bugboard `,
      bugboard: createNewBoard,
    });
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error("soemthing went wrong in catch in create bug board");
    //
  }
};

const createBug = async (req: Request | any, res: Response) => {
  // res.status(200).json({ message: "success" });
  // throw new Error("BROKEN");
  console.log(req.userDecoded);
  console.log("req body");
  console.log("hello inside createBug");
  //switch to req.body.sentObj.name
  console.log(req.body.sentObj.board);
  console.log(req.body.sentObj.title);
  console.log(req.body.sentObj.description);

  //   res.status(200).json({ message: "successfully connected to create bug" });

  try {
    let addBugToBugBoard = await BugBoard.findOneAndUpdate(
      {
        _id: req.body.sentObj.board,
      },
      {
        $push: {
          bugs: {
            title: req.body.sentObj.title,
            description: req.body.sentObj.description,
            createdBy: req.userDecoded._id,
          },
        },
      }
    );
    console.log("past push bug");
    console.log(addBugToBugBoard);

    res.status(200).json({
      message: `successfully got workspaces `,
      addedToBoard: addBugToBugBoard,
    });
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error("soemthing went wrong in catch");
  }
  // res.status(200).json({ message: "success inside createbug" });
};

const getBugs = asyncHandler(async (req: Request | any, res: Response) => {
  // res.status(200).json({ message: "success" });
  // throw new Error("BROKEN");
  console.log("inside get bugs");
  console.log(req.body);

  try {
    let getBoards = await BugBoard.find({
      workspace: req.body.server,
    });

    res.status(200).json({ message: "success", boards: getBoards });
  } catch (e) {}
  res.status(200).json({ message: "success from getBugs" });
});

const getWorkspaceMembers = asyncHandler(() => {});

const inviteWorkspaceMember = asyncHandler(
  async (req: Request | any, res: Response) => {
    console.log(req.body.sentObj.user);
    console.log(req.body.sentObj.workspace);

    try {
      // check user exitsts
      let checkUserExists = await User.findOne({
        email: req.body.sentObj.user,
      });

      //if user doesnt exist, throw error
      if (!checkUserExists) {
        res.status(401);
        throw new Error("User does not exist");
      }

      //check user not already in workspace
      let checkUserNotInWorkspace = await Members.findOne({
        user: checkUserExists._id,
        Workspace: req.body.sentObj.workspace,
      });

      // if user already in workspace, send error
      if (checkUserNotInWorkspace) {
        res.status(401);
        throw new Error("User already in workspace");
      }

      //create notification for user assuming all checks worked
      let createNotification = await Notification.create({
        workspace: req.body.sentObj.workspace,
        sentBy: req.userDecoded._id,
        sentTo: checkUserExists._id,
      });

      res.status(200).json({
        message: "success from inside inviteWorkspaceMember",
        notification: createNotification,
      });
    } catch (e) {
      console.log(e);
      res.status(400);
      throw new Error(
        "Something went wrong in catch in inviteworkspacememeber"
      );
    }
  }
);

const deleteWorkspaceMember = asyncHandler(() => {});

module.exports = {
  createBugBoard,
  createBug,
  getBugs,
  inviteWorkspaceMember,
};
