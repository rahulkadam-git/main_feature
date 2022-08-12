const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
  commentText: { type: String, require: true },
  commentStatus: {
    type: String,
    require: true,
  },
  querySolveDate: {
    type: String,
    require: true,
  },
  commentScreenshots: [{ type: String }],
  commentBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Comments", commentSchema);
