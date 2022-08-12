const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const queryMail = ({ subject, title, queryText, queryScreenshots }) => {
  console.log(subject, title, queryText, queryScreenshots);
  let images;
  const imgsLinks = (queryScreenshots) => {
    images = queryScreenshots.map((i) => i);
  };
  imgsLinks(queryScreenshots);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kadamr607@gmail.com",
      pass: "uuhqzehaqomnuowt",
    },
  });
  transporter.use(
    "compile",
    hbs({
      viewEngine: "express-handlebars",
      viewPath: "./views/",
    })
  );
  // send mail with defined transport object
  let mailOptions = {
    from: '"New complaint from user"<kadamr607@gmail.com>"',
    to: "kadamr607@outlook.com",
    subject: "Complaint from user", // Subject line
    text: "Hello world?", // plain text body
    //html: mailData, // html body
    template: "main",
    context: {
      title,
      subject,
      queryText,
      images,
    },
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
  return (response = "complain registered");
};

module.exports = { queryMail };
