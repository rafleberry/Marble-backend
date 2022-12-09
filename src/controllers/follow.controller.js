const Follow = require("../models/follow.model");

const getFollowInfo = async (req, res, next) => {
  try {
    const { owner, target } = req.query;

    const [followers, followings, isFollowing] = await Promise.all([
      Follow.find({ to: target }).count(),
      Follow.find({ from: target }).count(),
      Follow.findOne({ from: owner, to: target }),
    ]);
    return res.send({ followers, followings, isFollowing: !!isFollowing });
  } catch (err) {
    return next(err);
  }
};

const handleFollow = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const followInfo = await Follow.findOne({ from, to });
    if (followInfo) {
      await Follow.findOneAndRemove({ from, to });
    } else {
      const new_follow = new Follow({ from, to });
      await new_follow.save();
    }
    const [followers, followings, isFollowing] = await Promise.all([
      Follow.find({ to: to }).count(),
      Follow.find({ from: to }).count(),
      Follow.findOne({ from, to }),
    ]);
    return res.send({ followers, followings, isFollowing: !!isFollowing });
  } catch (err) {
    return next(err);
  }
};

const getFollowers = async (req, res, next) => {
  try {
    const { owner } = req.query;
    const followers = await Follow.find({ from: owner });
    return res.send(followers.map((_follower) => _follower.to));
  } catch (err) {
    return next(err);
  }
};

module.exports = { getFollowInfo, handleFollow, getFollowers };
