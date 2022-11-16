const Nft = require("../models/nft.model");

const registerNft = async (req, res, next) => {
  const { token_id, creator } = req.body;
  Nft.findOne({ token_id }, (err, doc) => {
    if (err) return next(err);
    if (doc) return res.status(400).send({ msg: "token id already exists." });
    const newNft = new Nft({
      token_id,
      creator,
    });
    newNft.save((saveErr, saveDoc) => {
      if (saveErr) return next(err);
      return res.send(saveDoc);
    });
  });
};

const getNfts = async (req, res, next) => {
  try {
    const { market_status, limit, skip } = req.query;
    const data = await Nft.find({ market_status }).skip(skip).limit(limit);
    return res.send(data);
  } catch (err) {
    return next(err);
  }
};

const setNft = async (req, res, next) => {
  try {
    const { market_status, token_id } = req.body;
    const data = await Nft.findOne({ token_id });
    data.market_status = market_status;
    await data.save();
    return res.send(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = { registerNft, getNfts, setNft };
