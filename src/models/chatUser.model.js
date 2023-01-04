const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatUserModelSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ChatUsers = mongoose.model("ChatUser", ChatUserModelSchema);
module.exports = ChatUsers;
