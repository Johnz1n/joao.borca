const mongoose = require("mongoose");
const { Schema } = mongoose;

const comicItemsSchema = new Schema({
  resourceURI: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  character: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'character',
  }
});

module.exports = mongoose.model("comicItems", comicItemsSchema);
