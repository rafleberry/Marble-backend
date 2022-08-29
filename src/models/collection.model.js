const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
});

const Collections = mongoose.model("Collection", CollectionSchema);
module.exports = Collections;
