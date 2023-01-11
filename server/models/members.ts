import mongoose from "mongoose";
const { Schema } = mongoose;
const { Workspace } = require("./workspace");
const { User } = require("./user");

const membersSchema = new Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Members", membersSchema);
