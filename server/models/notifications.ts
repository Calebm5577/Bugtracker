import mongoose from "mongoose";
// const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Workspace } = require("./workspace");
const { User } = require("./user");

const notificationsSchema = new Schema({
  workspace: {
    type: Workspace,
    required: true,
  },
  sentBy: {
    type: User,
    required: true,
  },
  sentTo: {
    type: User,
    required: true,
  },
  status: String,
});

module.exports = mongoose.model("Notifications", notificationsSchema);
