import mongoose from "mongoose";
const { Schema } = mongoose;
const { Workspace } = require("./workspace");
const { User } = require("./user");
const { Bug } = require("./bugs");

const bugBoardSchema = new Schema({
  name: String,
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  bugs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bug",
      required: false,
    },
  ],
});

module.exports = mongoose.model("BugBoard", bugBoardSchema);
