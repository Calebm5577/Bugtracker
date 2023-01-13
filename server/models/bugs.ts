import mongoose from "mongoose";
const { Schema } = mongoose;
const { Workspace } = require("./workspace");
// const { User } = require("./user");
// const { BugBoard } = require("./bugboard");

const bugSchema = new Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
});

module.exports = mongoose.model("Bug", bugSchema);
