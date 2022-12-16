const Comments = require("../models/comment.model");

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

module.exports = { addComment, getCommentCounts };
