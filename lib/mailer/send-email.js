const nodemailer = require('nodemailer');
const config = require('../../config');

const sendEmail = msg => {
  const transport = nodemailer.createTransport(config.sendgrid);

  transport.sendMail(msg, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
