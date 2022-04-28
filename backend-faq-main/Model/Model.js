const mongoose = require("mongoose");

const queSchema = new mongoose.Schema({
  type: { isApp: Boolean, isSoftware: Boolean },
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  imgs: [{ type: String }],
});

module.exports = mongoose.model("Questions", queSchema);
