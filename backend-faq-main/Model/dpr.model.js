const mongoose = require("mongoose");
const { Schema } = mongoose;

const faqSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: new Date(),
  },
  details: {
    project: {
      type: String,
      require: true,
    },
    client: {
      type: String,
      require: true,
    },
    EPC: {
      type: String,
      require: true,
    },
    report_prepared_by: {
      type: String,
      require: true,
    },
  },
  work_logs: [
    {
      description: {
        type: String,
        require: true,
      },
      manpower: { type: Number, require: true },
      onsite_assignment: { type: String, require: true },
    },
  ],
  general_notes: {
    type: String,
    require: true,
  },
  safety_observations: {
    type: String,
    require: true,
  },
  quality_control_obs: {
    type: String,
    require: true,
  },
  safety_questions: [
    {
      question: {
        type: Schema.ObjectId,
        ref: "Questions",
      },
      n_a: {
        type: Boolean,
        require: true,
      },
      no: {
        type: Boolean,
        require: true,
      },
      yes: {
        type: Boolean,
        require: true,
      },
      description: {
        type: String,
      },
    },
  ],
  site_photos: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Reports", faqSchema);
