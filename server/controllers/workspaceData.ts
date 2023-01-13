import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
// const { User } = require("../models/user");
const Workspace = require("../models/workspace");
const Members = require("../models/members");
const asyncHandler = require("express-async-handler");
const BugBoard = require("../models/bugboard");
const Bug = require("../models/bugs");

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
  console.log(req.body);
  //   res.status(200).json({ message: "successfully connected to create bug" });

  try {
    let addBugToBugBoard = await BugBoard.findOneAndUpdate(
      {
        _id: "63c1da50e192d9f3c480d360",
      },
      {
        $push: {
          bugs: {
            title: "bug title 1",
            description: "bug description 1",
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
};

const getBugs = asyncHandler(async (req: Request | any, res: Response) => {
  // res.status(200).json({ message: "success" });
  // throw new Error("BROKEN");
  console.log("inside get bugs");
  console.log(req.body.server);
  res.status(200).json({ message: "success" });
});

module.exports = {
  createBugBoard,
  createBug,
  getBugs,
};
