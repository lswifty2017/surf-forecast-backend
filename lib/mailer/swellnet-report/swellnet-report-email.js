const sendEmail = require('../send-email');
const moment = require('moment');

const swellnetReportEmail = reports => {
  let nullValueCount = 0;

  let reportHtml = `
    <table style="padding-bottom:20px;">
      <tr>
        <th>Path</th>
        <th>Date</th>
        <th>Nulls</th>
      </tr>
  `

  reports.forEach((report) => {
    if (report.null_values.length) {
      reportHtml += `<tr><td>${report.path}</td><td>${report.date_time}</td><td>${report.null_values.join(', ')}</td></tr></table>`;

      nullValueCount += report.null_values.length;
    }
  })

  console.log(reportHtml);

  reportHtml += `<b>Total null values: ${nullValueCount}`;

  const emailConfig = {
    to: ['l.swift94@gmail.com', 'Manibb04@gmail.com'],
    from: 'l.swift94@gmail.com',
    subject: `Swellnet Scrape Report - ${moment().format('DD-MM-YYYY')}`,
    html: reportHtml
  };

  sendEmail(emailConfig);
};

module.exports = swellnetReportEmail;
