import e, { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
// const { User } = require("../models/user");
const Workspace = require("../models/workspace");
const Members = require("../models/members");
const asyncHandler = require("express-async-handler");
const Notification = require("../models/notifications");
const BugBoard = require("../models/bugboard");
// const { Notifications } = require("../models/notifications");

//fix req: Request | any

// const test = async (req: Request | any, res: Response) => {
//   // res.send("Hello World!");
//   // throw new Error("BROKEN");
//   console.log("inside test");
//   console.log(req.userDecoded);
//   console.log("after req.userDecoded");
//   res.status(200).json({ message: "succes to test" });
// };

//update workspaces, and members
// const editBugTitle = asyncHandler(async (req: Request | any, res: Response) => {
//   console.log(req.body);
//   if (!req.body.sentObj.name) {
//     res.status(400);
//     throw new Error("need to include server name on create server");
//   }
//   console.log("made it to createWorkspace");
//   // console.log(req.body.sentObj.name);
//   console.log(req.userDecoded);
//   // console.log(req.headers);
//   try {
//     let newWorkspace = await Workspace.create({
//       name: req.body.sentObj.name,
//       createdBy: req.userDecoded._id,
//       // createdAt : '' defaults to now
//     });

//     let updateWorkspaceMembers = await Members.create({
//       name: newWorkspace.name,
//       workspace: newWorkspace.id,
//       user: req.userDecoded._id,
//     });
//     console.log("new workspace");
//     console.log(newWorkspace);
//     console.log("update workspace members");
//     console.log(updateWorkspaceMembers);

//     res.status(200).json({ message: `successfully created workspace ` });
//   } catch (e) {
//     console.log(e);
//     console.log("end error");
//     res.status(400);
//     throw new Error("soemthing went wrong in catch");
//     //
//   }
// });

const deleteBug = asyncHandler(async (req: Request, res: Response) => {
  //confirm bug exits
  console.log(req.body);

  //   if so, delete bug
  try {
    let deleteBug = await BugBoard.findOneAndUpdate(
      {
        _id: req.body.authObject.sentObj.workspace,
      },
      {
        $pull: {
          bugs: {
            _id: req.body.authObject.sentObj.bug,
          },
        },
      }
    );
    console.log("deleteBug");
    console.log(deleteBug);

    res.status(200).json({ message: "successfully deleted bug" });
  } catch (e) {
    console.log("error");
    console.log(e);
    res.status(400);
    throw new Error("Something went wrong");
  }
});

const editBugTitle = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  // if (
  //   req.body.authObject.sentObj.method != "title" ||
  //   req.body.authObject.sentObj.method != "description" ||
  //   req.body.authObject.sentObj.method != "status" ||
  //   req.body.authObject.sentObj.method != "urgency"
  // ) {
  //   res.status(400);
  //   throw new Error("Invalid method");
  // }

  // console.log(req.body.authObject.sentObj);

  // res.status(200).json({ message: "made it too editBugTitle" });

  //   if so, delete bug
  try {
    let editBug = await BugBoard.findOneAndUpdate(
      {
        _id: req.body.authObject.sentObj.board,
        "bugs._id": req.body.authObject.sentObj.bug,
      },
      {
        $set: {
          [`bugs.$.${req.body.authObject.sentObj.method}`]:
            req.body.authObject.sentObj.data,
        },
      }
    );
    console.log("editBug");
    console.log(editBug);

    res.status(200).json({ message: "successfully edited bug" });
  } catch (e) {
    console.log("error");
    console.log(e);
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// const getWorkspaces = async (req: Request | any, res: Response) => {
//   // res.status(200).json({ message: "success" });
//   // throw new Error("BROKEN");
//   console.log(req.userDecoded);

//   try {
//     let getMyWorkspaces = await Members.find({
//       user: req.userDecoded._id,
//       // createdAt : '' defaults to now
//     });
//     console.log("gotten workspaces");
//     console.log(getMyWorkspaces);
//     // console.log("getMyWorkspaces");
//     // console.log(getMyWorkspaces);
//     //const { password, ...user } = checkuser._doc;

//     res.status(200).json({
//       message: `successfully got workspaces `,
//       servers: getMyWorkspaces,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(400);
//     throw new Error("soemthing went wrong in catch");
//     //
//   }
//   //   console.log("inside test");
//   //   console.log(req.userDecoded);
//   //   console.log("after req.userDecoded");
// };

// const getUserData = async (req: Request | any, res: Response) => {
//   // res.send("Hello World!");
//   // throw new Error("BROKEN");
//   //   try {
//   //     let userData = await User.find({
//   //       user: "someone",
//   //     });
//   //     res.status(200).json({
//   //       message: `successfully created workspace `,
//   //       ...userData,
//   //     });
//   //   } catch (e) {
//   //     res.status(400);
//   //     throw new Error("soemthing went wrong in catch");
//   //     //
//   //   }
// };

// const getNotifications = asyncHandler(
//   async (req: Request | any, res: Response) => {
//     // res.send("Hello World!");
//     // res.status(200).json({ message: "success, made it too getNotifications" });
//     try {
//       let getUserNotification = await Notification.find({
//         sentTo: req.userDecoded._id,
//       })
//         .populate("workspace")
//         .populate("sentBy");
//       // console.log("getUserNotification");
//       // console.log(getUserNotification);
//       // console.log("populated workspace");
//       // let newWorkspace = await getUserNotification.workspace.populate();
//       // console.log(newWorkspace);
//       // console.log("populated sentBy");
//       // let newSentBy = await getUserNotification.sentBy.populate();
//       // console.log(newSentBy);
//       res.status(200).json({
//         message: `successfully retrieved all notifications `,
//         getUserNotification,
//       });
//     } catch (e) {
//       res.status(400);
//       throw new Error("soemthing went wrong in catch");
//       //
//     }
//   }
// );

// const acceptOrDenyNotificatons = asyncHandler(
//   async (req: Request | any, res: Response) => {
//     // res.send("Hello World!");
//     // res.status(200).json({ message: "success, made it too getNotifications" });
//     console.log("hello inside acceptordeny");
//     console.log(req.body);
//     console.log("the whole ass request");

//     if (req.body.authObject.bool === "true") {
//       //check if user alread in server

//       try {
//         //add user to the server
//         let addUserToServer = await Members.create({
//           name: req.body.authObject.workspace.name,
//           workspace: req.body.authObject.workspace._id,
//           user: req.userDecoded._id,
//         });

//         console.log("addeUserToServer");
//         console.log(addUserToServer);

//         // delete notification
//         let deleteNotification = await Notification.findOneAndDelete({
//           _id: req.body.authObject._id,
//         });

//         console.log("deleteNotificaton");
//         console.log(deleteNotification);
//         res.status(200).json({ message: "successfuly accepted invite" });
//       } catch (e) {
//         console.log("error in try catch acceptOrDenyNotis");
//         console.log(e);
//         res.status(400);
//         throw new Error("something went wrong in catch");
//       }

//       //
//     } else if (req.body.authObject.bool === "false") {
//       try {
//         let deleteNotification = await Notification.findOneAndDelete({
//           _id: req.body.authObject._id,
//         });
//         res.status(200).json({ message: "successfuly denied invite" });
//       } catch (e) {
//         console.log("error in try catch acceptOrDenyNotis");
//         console.log(e);
//         res.status(400);
//         throw new Error("something went wrong in catch");
//       }
//     } else {
//       res.status(400);
//       throw new Error("Something went wrong in response");
//     }
//     // console.log(req);
//   }
// );

module.exports = {
  deleteBug,
  editBugTitle,
};
