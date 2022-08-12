const router = require("express").Router();

const controller = require("../controller/dpr.controller");


router.post("/dailyreport",controller.dailyreports)
router.get("/allQuestions",controller.allQuestions)

module.exports = router;