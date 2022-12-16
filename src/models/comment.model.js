const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    token_id: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comment", CommentSchema);
module.exports = Comments;
