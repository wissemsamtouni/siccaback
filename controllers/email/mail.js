const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const sendemail = async (req, res) => {
    let mail  = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "wissem.samtouni@esprit.tn", // generated ethereal user
            pass: "E07967443ws",
        },
    });
    const mailOptions = {
        from: "SAMTOUNI WISSEM", // sender address
        to: email.mail, // list of receivers
        subject: "Bienvenu au siccaplan 👻", // Subject line
        html: `<h1>Hi ${email.nom}</h1><br>
    <h4>Thanks for joining us</h4>`, // html body
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        } else {
            res.json({ message: "Email sent!!!" });
        }
    });
};

module.exports = {
    sendemail
};
