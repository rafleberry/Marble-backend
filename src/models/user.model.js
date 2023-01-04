const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModelSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    banner: {
      type: String,
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    mail: {
      type: String,
      lowercase: true,
    },
    discord: {
      type: String,
    },
    isCreator: {
      type: Boolean,
      default: false,
    },
    isCollector: {
      type: Boolean,
      default: false,
    },
    isAgreed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", UserModelSchema);
module.exports = Users;
