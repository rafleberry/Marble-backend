const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Follows = mongoose.model("Follow", FollowSchema);
module.exports = Follows;
