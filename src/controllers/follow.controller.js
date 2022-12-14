const Follow = require("../models/follow.model");
const User = require("../models/user.model");

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
    const { owner, skip = 0, limit = 15 } = req.query;
    const followers = await Follow.find({ from: owner })
      .skip(skip)
      .limit(limit);
    const followerInfos = await Promise.all(
      followers.map(async (element) => {
        const info = await User.findOne({ id: element.to });
        return info;
      })
    );
    return res.send(followerInfos);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getFollowInfo, handleFollow, getFollowers };
