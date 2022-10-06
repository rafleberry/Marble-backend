const Collection = require("../models/collection.model");
const User = require("../models/user.model");

const setCollection = async (req, res, next) => {
  const { id, creator, category } = req.body;
  Collection.findOne({ id }, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      User.findOne({ id: creator }, (userErr, userDoc) => {
        if (userErr) return next(userErr);
        if (!userDoc)
          return res.status(400).send({ msg: "User doesn't exist" });
        userDoc.isCreator = true;
        userDoc.save((userSaveErr, userSaveDoc) => {
          if (userSaveErr) return next(userSaveErr);
        });
      });
      const newCollection = new Collection({
        id,
        creator,
        category,
      });
      newCollection.save((saveErr, saved) => {
        if (saveErr) return next(saveErr);
        return res.send(saved);
      });
    } else {
      return res.status(400).send({ msg: "Collection already exists" });
    }
  });
};

const editCollection = async (req, res, next) => {
  const { id, category, creator } = req.body;
  Collection.findOne({ id }, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      // return res.status(400).send({ msg: "Collection doesn't exist" });
      const newCollection = new Collection({
        id,
        creator,
        category,
      });
      newCollection.save((saveErr, saved) => {
        if (saveErr) return next(saveErr);
        return res.send(saved);
      });
    } else {
      doc.category = category;
      doc.save((saveErr, saveDoc) => {
        if (saveErr) return next(saveErr);
        return res.send(saveDoc);
      });
    }
  });
};

const removeCollection = async (req, res, next) => {
  const { id } = req.body;
  Collection.findOneAndRemove({ id }, (err, doc) => {
    if (err) return next(err);
    if (doc) return res.send({ msg: "Successfully Removed" });
  });
};
const getAllCollections = async (req, res, next) => {
  Collection.find({}, (err, doc) => {
    if (err) return next(err);
    return res.send(doc);
  });
};
const getActivedCollections = async (req, res, next) => {
  const { category, from_index } = req.query;
  Collection.find({ category })
    .skip(from_index)
    .limit(20)
    .then((doc) => {
      if (!doc) return res.send([]);
      console.log("doc: ", doc);
      return res.send(doc.map((element) => element.id));
    })
    .catch((err) => {
      return next(err);
    });
};
const getCollection = async (req, res, next) => {
  const { id } = req.query;
  Collection.findOne({ id }, (err, doc) => {
    if (err) return next(err);
    if (!doc) return res.status(400).send({ msg: "Collection not found" });
    else {
      return res.send(doc);
    }
  });
};
module.exports = {
  setCollection,
  editCollection,
  removeCollection,
  getAllCollections,
  getActivedCollections,
  getCollection,
};
