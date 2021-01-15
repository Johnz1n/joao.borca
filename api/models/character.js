const mongoose = require("mongoose");
const { Schema } = mongoose;

const characterSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  thumbnail: {
    path: {
        type: String,
        require: true,
    },
    extension: {
        type: String,
        require: true,
    },
  },
  modified: {
    type: Date,
    default: Date.now,
  },
  comics: {
    available: {
      type: String,
      require: true,
    },
    collectionURI: {
      type: String,
      require: true,
    },
    items : [
        {type: mongoose.Schema.Types.ObjectId,ref:'comicItems'}
    ]
  },
});

module.exports = mongoose.model("character", characterSchema);
