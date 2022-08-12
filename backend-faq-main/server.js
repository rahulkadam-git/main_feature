const express = require("express");
const dbConnection = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
dotenv.config();
// require("./config.env")
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());
//database connection
dbConnection();

app.use("/api", require("./Route/que.route"));
app.use("/api", require("./Route/dpr.route"));
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);



runJob()
function runJob() {
  console.log("start");
  cron.schedule("* 55 15 * * *", function () { 
    require("./controller/scheduleReport.controller");
});

};
// Schedule tasks to be run on the server.

