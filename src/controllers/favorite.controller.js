const Favorites = require("../models/favorite.model");

const addFavorite = async (req, res, next) => {
  try {
    const { token_id, user } = req.body;
    let oldData = await Favorites.findOne({ token_id, user });
    let isFavoriteOne = false;
    if (oldData) {
      await Favorites.findOneAndRemove({ token_id, user });
    } else {
      oldData = new Favorites({ token_id, user });
      await oldData.save();
      isFavoriteOne = true;
    }
    const favoritesCnt = await Favorites.find({ token_id }).count();
    return res.send({ cnt: favoritesCnt, isFavoriteOne });
  } catch (err) {
    return next(err);
  }
};

const getFavoriteCnt = async (req, res, next) => {
  try {
    const { token_id, user } = req.query;
    const favoritesCnt = await Favorites.find({ token_id }).count();
    let oldData = await Favorites.findOne({ token_id, user });
    return res.send({
      cnt: favoritesCnt,
      isFavoriteOne: oldData ? true : false,
    });
  } catch (err) {
    return next(err);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    const { token_id, skip = 0, limit = 10 } = req.query;
    const favorites = await Favorites.find({ token_id })
      .skip(skip)
      .limit(limit);
    return res.send(favorites);
  } catch (err) {
    return next(err);
  }
};

module.exports = { addFavorite, getFavoriteCnt, getFavorites };
