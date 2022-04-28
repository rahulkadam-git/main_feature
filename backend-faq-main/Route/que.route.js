const router = require("express").Router();

const controller = require("../controller/que.controller");

router.post("/questions", controller.questions);

module.exports = router;
