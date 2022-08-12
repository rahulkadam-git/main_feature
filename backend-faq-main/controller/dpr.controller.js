const Reports = require("../Model/dpr.model");
const DprReportQuestions = require("../Model/dprQue.model");

exports.dailyreports = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(200).json("error found");
    }
    console.log(req.body);
    const {
      time,
      details,
      work_logs,
      general_notes,
      safety_observations,
      quality_control_obs,
      safety_questions,
      site_photos,
    } = req.body;

    const Report = new Reports({
      time,
      details,
      work_logs,
      general_notes,
      safety_observations,
      quality_control_obs,
      safety_questions,
      site_photos,
    });

    const newReport = await Report.save();
    return res.status(500).json(newReport);
  } catch (error) {
    return res.status(400).json("something went wrong");
  }
};

exports.allQuestions = async (req, res) => {
  try {
    if(!req.body){
      return res.status(200).json("error found");
    }
    console.log("first")
    const allQuestions = await DprReportQuestions.find();
    console.log(allQuestions,"jjjjjjjjjjjj")
    return res.status(200).json(allQuestions);
  } catch (error) {
    return res.status(400).json("something went wrong");
  }
};
