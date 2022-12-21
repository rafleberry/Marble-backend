const User = require("../models/user.model");

const registerUserInfo = async (req, res, next) => {
  try {
    const { id, name, bio, mail, discord } = req.body;
    let oldUser = await User.findOne({ id });
    if (!oldUser) {
      oldUser = new User({
        id,
        name,
        bio,
        mail,
        discord,
      });
    } else {
      oldUser.name = name;
      oldUser.bio = bio;
      oldUser.mail = mail;
      oldUser.discord = discord;
    }
    await oldUser.save();
  } catch (error) {
    console.log("register error: ", error);
    return next(error);
  }
};

const setImage = async (req, res, next) => {
  try {
    const { id } = req.body;
    const key = Object.keys(req.body)[1];

    User.findOne({ id }, (err, doc) => {
      if (err) return next(err);
      if (!doc) {
        const new_user = new User({ id, [key]: req.body[key] });
        new_user.save((error, newUser) => {
          if (error) {
            return next(error);
          }
          return res.send(newUser);
        });
      } else {
        doc[key] = req.body[key];
        doc.save((error, modifiedUser) => {
          if (error) {
            return next(error);
          }
          return res.send(modifiedUser);
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const { id } = req.query;
    User.findOne({ id }, (err, doc) => {
      if (err) return next(err);
      if (!doc) {
        const new_user = new User({ id: id });
        new_user.save((error, newUser) => {
          if (error) return next(error);
          return res.status(200).send(newUser);
        });
      } else {
        return res.status(200).send(doc);
      }
    });
  } catch (err) {
    return next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { skip, limit, sort = "desc" } = req.query;
    const data = await User.find()
      .sort({ name: sort, id: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getNumberInfo = async (req, res, next) => {
  try {
    const [totalUsers, totalCreators] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isCreator: true }),
    ]);
    return res.status(200).send({
      profiles: totalUsers,
      creators: totalCreators,
    });
  } catch (err) {
    return next(err);
  }
};

const getAvatar = async (req, res, next) => {
  const { id } = req.query;
  User.findOne({ id }, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      return res.status(404).send({ msg: "Can't find profile info" });
    } else {
      return res.status(200).send(doc.avatar);
    }
  });
};

const getSimpleUser = async (req, res, next) => {
  try {
    const { id } = req.query;
    User.findOne({ id }, (err, doc) => {
      if (err) return next(err);
      if (!doc) {
        const new_user = new User({ id: id });
        new_user.save((error, newUser) => {
          if (error) return next(error);
          return res.status(200).send(newUser);
        });
      } else {
        return res.status(200).send({ avatar: doc.avatar, name: doc.name });
      }
    });
  } catch (err) {
    return next(err);
  }
};
const getFilteredUsers = async (req, res, next) => {
  const { creator, skip, limit, sort = "asc" } = req.query;
  User.find({ isCreator: creator })
    .sort({ name: sort })
    .skip(skip)
    .limit(limit)
    .then((doc) => {
      return res.send(doc);
    })
    .catch((err) => {
      return next(err);
    });
};
const setCreator = async (req, res, next) => {
  const { id } = req.body;
  User.findOne({ id }, (err, doc) => {
    if (err) return next(err);
    if (!doc) return res.status(400).send({ msg: "User doesn't exist" });
    doc.isCreator = true;
    doc.save((saveErr, saveDoc) => {
      if (saveErr) return next(saveErr);
      return res.send(saveDoc);
    });
  });
};
const removeDuplicates = async (req, res, next) => {
  try {
    const users = await User.find();
    const userIds = users.map((_user) => _user.id);
    for (let i = 0; i < userIds.length; i++) {
      const _count = await User.find({ id: userIds[i] }).count();
      if (_count > 1) {
        console.log("userIds: ", userIds[i]);
        await User.findOneAndRemove({ id: userIds[i] });
      }
    }
    return res.send("ok");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  registerUserInfo,
  getUserInfo,
  getUsers,
  getNumberInfo,
  setImage,
  getAvatar,
  getFilteredUsers,
  setCreator,
  getSimpleUser,
  removeDuplicates,
};
