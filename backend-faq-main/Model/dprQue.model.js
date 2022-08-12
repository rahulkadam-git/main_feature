const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
      question: {

        type: String,
        enum: [
          "Any accidentes on site today?",
          "Any schedule delay occurred?",
          "Did weather cause any delay?",
          "Any visitor on site?",
          "Any areas that can't be worked on?",
          "Any equipment rented on site?",
          "Consultant Visit",
        ],
    }
});

module.exports = mongoose.model("DprReportQuestions", questionsSchema);
