import mongoose from "mongoose";
const { Schema } = mongoose;
const { Workspace } = require("./workspace");
const { User } = require("./user");

const userSchema = new Schema({
  workspace: {
    type: Workspace,
    required: true,
  },
  createdBy: {
    type: User,
    required: true,
  },
  bug: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  assigned: {
    type: User,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
