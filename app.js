const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({ recipient_email }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "damianungureanu2000@gmail.com",
        pass: "dwxi nyyx bmul lpge",
      },
    });
    const mailConfig = {
      from: "damianungureanu2000@gmail.com",
      to: recipient_email,
      subject: "Verificare Email",
      text: "cod 000",
    };
    transporter.sendMail(mailConfig, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: "a aparut o eroare" });
      } else {
        return resolve({ message: "a fost trimis cu succes" });
      }
    });
  });
}
app.get("/", (req, res) => {
  sendEmail({ recipient_email: "damianungureanu2000@gmail.com" })
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
app.post("/", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
app.listen(port, () => {
  console.log(`nodeMailer listening to http://localhost:${port}`);
});
