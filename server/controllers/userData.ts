import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
// const { User } = require("../models/user");
const Workspace = require("../models/workspace");
const { Members } = require("../models/members");
const asyncHandler = require("express-async-handler");
// const { Notifications } = require("../models/notifications");

//fix req: Request | any

const test = async (req: Request | any, res: Response) => {
  // res.send("Hello World!");
  // throw new Error("BROKEN");
  console.log("inside test");
  console.log(req.userDecoded);
  console.log("after req.userDecoded");
  res.status(200).json({ message: "succes to test" });
};

//update workspaces, and members
const createWorkspace = asyncHandler(
  async (req: Request | any, res: Response) => {
    console.log("made it to createWorkspace");
    console.log(req.body.sentObj.name);
    try {
      let newWorkspace = await Workspace.create({
        name: req.body.sentObj.name,
        createdBy: req.body.sentObj.user,
        // createdAt : '' defaults to now
      });

      // let updateWorkspaceMembers = await Members.create({
      //   workspace: newWorkspace.id,
      //   user: "someone",
      // });

      res.status(200).json({ message: `successfully created workspace ` });
    } catch (e) {
      console.log(e);
      console.log("end error");
      res.status(400);
      throw new Error("soemthing went wrong in catch");
      //
    }
  }
);

const getWorkspaces = async (req: Request | any, res: Response) => {
  // res.send("Hello World!");
  // throw new Error("BROKEN");
  //   try {
  //     let getMyWorkspaces = await Members.find({
  //       user: "someone",
  //       // createdAt : '' defaults to now
  //     });
  //     res.status(200).json({ message: `successfully created workspace ` });
  //   } catch (e) {
  //     res.status(400);
  //     throw new Error("soemthing went wrong in catch");
  //     //
  //   }
  //   console.log("inside test");
  //   console.log(req.userDecoded);
  //   console.log("after req.userDecoded");
};

const getUserData = async (req: Request | any, res: Response) => {
  // res.send("Hello World!");
  // throw new Error("BROKEN");
  //   try {
  //     let userData = await User.find({
  //       user: "someone",
  //     });
  //     res.status(200).json({
  //       message: `successfully created workspace `,
  //       ...userData,
  //     });
  //   } catch (e) {
  //     res.status(400);
  //     throw new Error("soemthing went wrong in catch");
  //     //
  //   }
};

const getNotifications = async (req: Request | any, res: Response) => {
  // res.send("Hello World!");
  // throw new Error("BROKEN");
  //   try {
  //     let userData = await Notifications.find({
  //       sentTo: "someone",
  //     });
  //     res.status(200).json({
  //       message: `successfully retrieved all notifications `,
  //       ...userData,
  //     });
  //   } catch (e) {
  //     res.status(400);
  //     throw new Error("soemthing went wrong in catch");
  //     //
  //   }
};

module.exports = {
  test,
  createWorkspace,
  getWorkspaces,
  getUserData,
  getNotifications,
};
