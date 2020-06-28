require('dotenv').config();
const nodemailer = require('nodemailer');

const emailNotification = (recipientEmail, subject, mailBody) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  
  let mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject: subject,
    text: mailBody
  };
  
  transporter.sendMail(mailOptions, (err, info) => {
    if(err){
      console.log(err);
    } else {
      console.log('Mail was sent', info.response);
    }
  });
}

module.exports = emailNotification;