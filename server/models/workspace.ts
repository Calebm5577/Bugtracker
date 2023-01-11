// export {};
import mongoose from "mongoose";
// const mongoose = require("mongoose");
// const { User } = require("./user");
const { Schema } = mongoose;

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    ref: "User",
    // required: true,
  },
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //     // required: true,
  //   },
});

module.exports = mongoose.model("Workspace", workspaceSchema);

// import mongoose from "mongoose";
// // const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model("User", userSchema);
