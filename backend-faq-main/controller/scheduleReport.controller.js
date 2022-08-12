const nodemailer = require("nodemailer");
const Questions = require("../Model/Model");
const XLSX = require("xlsx");
const path = process.cwd();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kadamr607@gmail.com",
    pass: "jgulhtcftbtqzygx",
  },
});


const getJsonData = async (req,res) => {
    var wb = XLSX.utils.book_new();
    const jsonDataToConvert = await Questions.find();
    var temp = JSON.stringify(jsonDataToConvert);
    temp = JSON.parse(temp);
    var ws = XLSX.utils.json_to_sheet(temp);
    var down = path;
    XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    XLSX.writeFile(wb, "Sample-Data.xlsx");
    
  };

getJsonData();

let messageOptions = {
  from: "kadamr607@gmail.com",
  to: "kadamr607@gmail.com",
  subject: "Scheduled Email",
  text: "Hi there. This email was sent by us. suck it looser!!!",
  attachments: [{
    filename: "Sample-Data.xlsx",
    path: path+"/Sample-Data.xlsx"
}]
};

transporter.sendMail(messageOptions, function (error, info) {
  if (error) {
    throw error;
  } else {
    console.log("Email successfully sent!");
  }
});


const fs = require('fs')

const path2 = './Sample-Sales-Data.xlsx'

try {
  if (fs.existsSync(path2)) {
    console.log("exist")
  }
} catch(err) {
  console.error(err)
}






