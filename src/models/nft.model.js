const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NftSchema = new Schema(
  {
    token_id: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    market_status: {
      type: String,
      default: "Offer",
    },
  },
  {
    timestamps: true,
  }
);

const Nfts = mongoose.model("Nft", NftSchema);
module.exports = Nfts;
