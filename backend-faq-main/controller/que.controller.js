const Questions = require("../Model/Model");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

exports.questions = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(200).json("error found");
    }
    const { type, title, text, imgs, subject } = req.body;

    const Question = new Questions({
      type,
      title,
      text,
      imgs,
      subject,
    });

    const userComplain = await Question.save();
    const response = "Your complain is registered";
    console.log(userComplain);
    if (userComplain) {
      let images;
      
      const imgsLinks = (imgs) => {
    images = imgs.map((i) => i);
      };

      imgsLinks(imgs);

      //const mailData = `<div>${images}</div>`;
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kadamr607@gmail.com",
          pass: "jgulhtcftbtqzygx",
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
          text,
          images
        },
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
      if (response) {
        return res.status(200).json(response);
      }
    }
  } catch (error) {
    return res.status(400).json("something went wrong");
  }
};
