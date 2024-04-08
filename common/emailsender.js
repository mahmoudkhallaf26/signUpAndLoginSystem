const nodemailer = require("nodemailer");


async function sendEmail(dest,message)
{
    
const transporter = nodemailer.createTransport({

    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Mahmoudkhallaf 👻" <${process.env.email}>`, // sender address
      to: dest, // list of receivers
      subject: "confirmationemail ✔", // Subject line
      text: "Hello world?", // plain text body
      html: message, // html body
    });
    console.log("Message sent: %s", info.messageId);
  

  }
  main().catch(console.error);
}

module.exports = sendEmail