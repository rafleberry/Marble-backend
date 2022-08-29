const User = require("../models/user.model");

const registerUserInfo = async (req, res, next) => {
  try {
    const { id, name, bio, mail, discord } = req.body;

    User.findOne({ id }, (err, doc) => {
      if (err) return next(err);
      if (!doc) {
        const data = new User({
          id,
          name,
          bio,
          mail,
          discord,
        });
        data.save((err, doc) => {
          if (err) {
            return next(err);
          }
          return res.send(doc);
        });
      } else {
        doc.name = name;
        doc.bio = bio;
        doc.mail = mail;
        doc.discord = discord;
        doc.save((error, modifiedUser) => {
          if (error) {
            return next(error);
          }
          return res.send(modifiedUser);
        });
      }
    });
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
    const { page, limit, sort = "asc" } = req.query;
    const data = await User.find()
      .sort({ name: sort })
      .skip(page * limit)
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
const loginUser = async (req, res, next) => {};
const controlFollow = async (req, res, next) => {
  const { id, target } = req.body;
  User.findOne({ id }, (err, doc) => {
    if (err) return next(err);
    const index = doc.following.indexOf(target);
    if (index >= 0) {
      doc.following.splice(index, 1);
    } else doc.following.push(target);
    doc.save((err, user) => {
      if (err) return next(err);
    });
  });
  User.findOne({ target }, (err, doc) => {
    if (err) return next(err);
    const index = doc.followers.indexOf(target);
    if (index >= 0) {
      doc.followers.splice(index, 1);
    } else doc.followers.push(target);
    doc.save((err, user) => {
      if (err) return next(err);
      return res.send(user);
    });
  });
};
const getFilteredUsers = async (req, res, next) => {
  const { creator, page, limit, sort = "asc" } = req.query;
  User.find({ isCreator: creator })
    // .sort({ name: sort })
    // .skip(page * limit)
    // .limit(limit)
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
module.exports = {
  registerUserInfo,
  getUserInfo,
  getUsers,
  getNumberInfo,
  setImage,
  getAvatar,
  loginUser,
  controlFollow,
  getFilteredUsers,
  setCreator,
};
