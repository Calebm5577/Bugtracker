import mongoose from "mongoose";
const { Schema } = mongoose;
const { Workspace } = require("./workspace");
const { User } = require("./user");
const { Bug } = require("./bugs");
const { UUID } = require("bson");

const bugBoardSchema = new Schema({
  name: String,
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  bugs: [
    {
      _id: {
        type: String,
        required: true,
        default: () => new UUID(),
      },
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
        default: "critical",
      },
      status: {
        type: String,
        required: true,
        default: "idle",
      },
      assigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    },
  ],
});

module.exports = mongoose.model("BugBoard", bugBoardSchema);
