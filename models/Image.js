const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imageSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    image: {
      type: String,
    },
  },
  {
    collection: "images",
  }
);
module.exports = mongoose.model("Image", imageSchema);
