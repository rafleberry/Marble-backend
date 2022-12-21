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
        const [info, followerCounts, followingCounts] = await Promise.all([
          User.findOne({ id: element.to }),
          Follow.find({ to: element.to }).count(),
          Follow.find({ from: element.to }).count(),
        ]);
        return {
          ...info._doc,
          following: followerCounts,
          followers: followingCounts,
        };
      })
    );
    return res.send(followerInfos);
  } catch (err) {
    return next(err);
  }
};

const getUnFollowers = async (req, res, next) => {
  try {
    const { user, skip = 0, limit = 10 } = req.query;
    const followers = await Follow.find({ from: user });
    let followersIds = followers.map((follower) => follower.to);
    followersIds.push(user);
    const unfollowUsers = await User.find({ id: { $nin: followersIds } })
      .skip(skip)
      .limit(limit);
    return res.send(unfollowUsers);
    // Follow.find({ from: user }).then((followers, err1) => {
    //   if (err1) return next(err1);
    //   const followersIds = followers.map((follower) => follower.to);
    //   console.log(
    //     `followers of user ${user} is ${followersIds.length}, ${followersIds}`
    //   );
    //   // User.find({ id: { $ne: { $in: followersIds } } }).then((users, err2) => {
    //   User.find({ id: { $nin: followersIds } }).then((users, err2) => {
    //     if (err2) return next(err2);
    //     console.log(`unfollowers of user ${user} is ${users.length} ${users}`);
    //     return res.status(200).json({ users });
    //   });
    // });
    // const unFollowersInfo = await Promise.all(
    //   unFollowers.map(async (element) => {
    //     const info = await User.findOne({ id: element.from });
    //     return info;
    //   })
    // );
    // return res.send(unFollowersInfo);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getFollowInfo, handleFollow, getFollowers, getUnFollowers };
