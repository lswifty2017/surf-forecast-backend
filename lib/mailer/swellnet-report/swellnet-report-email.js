import sendEmail from '../send-email';
import moment from 'moment';

const swellnetReportEmail = report => {
  const emailConfig = {
    to: ['l.swift94@gmail.com', 'Manibb04@gmail.com'],
    from: 'l.swift94@gmail.com',
    subject: `Swellnet Scrape Report - ${moment().format('DD-MM-YYYY')}`,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };

  sendEmail(emailConfig);
};

module.exports = swellnetReportEmail;
