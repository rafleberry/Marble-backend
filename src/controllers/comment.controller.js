const Comments = require("../models/comment.model");
const User = require("../models/user.model");

const addComment = async (req, res, next) => {
  try {
    const { token_id, writer, content } = req.body;
    const comment = new Comments({ token_id, writer, content });
    comment.save();
    return res.send("Successfully Saved");
  } catch (err) {
    return next(err);
  }
};

const getCommentCounts = async (req, res, next) => {
  try {
    const { token_id } = req.query;
    const commentCount = await Comments.find({ token_id }).count();
    return res.send({ comment: commentCount });
  } catch (err) {
    return next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const { token_id, skip = 0, limit = 10 } = req.query;
    const comments = await Comments.find({ token_id })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    const result = await Promise.all(
      comments.map(async (_comment) => {
        const _commentOwnerInfo = await User.findOne({ id: _comment.writer });
        return {
          ..._comment._doc,
          ..._commentOwnerInfo._doc,
          createdAt: _comment._doc.createdAt,
        };
      })
    );
    return res.send({ comment: result });
  } catch (err) {
    return next(err);
  }
};

module.exports = { addComment, getCommentCounts, getComments };
