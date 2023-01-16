import mongoose from "mongoose";
// const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Workspace } = require("./workspace");
const { User } = require("./user");

const notificationsSchema = new Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sentTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // status: String,
});

module.exports = mongoose.model("Notifications", notificationsSchema);
