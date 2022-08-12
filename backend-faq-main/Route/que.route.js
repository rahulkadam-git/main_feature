const router = require("express").Router();

const controller = require("../controller/que.controller");

router.post("/query/add-query/", controller.query);
router.get("/query/date-query/:date", controller.allQuery);
router.get("/query/queryId/:_id", controller.getQueryFromID);
router.post("/query/query-response", controller.queryComments);

module.exports = router;
