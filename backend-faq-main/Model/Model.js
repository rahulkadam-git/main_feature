const mongoose = require("mongoose");
const { Schema } = mongoose;

const querySchema = new mongoose.Schema({
  selectedType: { type: String, require: true },
  subject: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  queryText: {
    type: String,
    require: true,
  },
  queryRegistraionDate: {
    type: Date,
    default: new Date(),
    require: true,
  },
  queryScreenshots: [{ type: String }],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  queryRegistredBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Queries", querySchema);
