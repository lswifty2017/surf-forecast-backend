const sendEmail = require('../send-email');
const moment = require('moment');

const swellnetReportEmail = reports => {
  const pathsAtRisk = [];
  let nullValueCount = 0;
  let reportHtml = '<html>';
  let listHtml = '<b>Paths at risk</b><ul style="padding-bottom:20px;">';
  
  let reportTableHtml = `
    <table style="padding-bottom:20px;">
      <tr>
        <th>Path</th>
        <th>Date</th>
        <th>Null Values</th>
      </tr>
  `

  reports.forEach((report) => {
    if (report.null_values.length) {
      reportTableHtml += `<tr><td>${report.path}</td><td>${report.date_time}</td><td>${report.null_values.join(', ')}</td></tr></table>`;
      
      if (report.null_values.length > 3) {
        pathsAtRisk.push(report.path);
        listHtml += `<li>${report.path}</li>`;
      };
      
      nullValueCount += report.null_values.length;
    }
  })

  reportHtml += `<div><b style="padding-bottom:20px;">Total Null Values: ${nullValueCount}</b></div>`;
  if (pathsAtRisk.length) {
    reportHtml += listHtml + '</ul>';
  } else {
    reportHtml += '<div><b style="padding-bottom:20px;">No paths currently at risk</b></div>';
  }
  reportHtml += reportTableHtml + '</html>';

  const emailConfig = {
    to: ['l.swift94@gmail.com', 'Manibb04@gmail.com'],
    from: 'l.swift94@gmail.com',
    subject: `Swellnet Scrape Report - ${moment().format('DD-MM-YYYY')}`,
    html: reportHtml
  };

  sendEmail(emailConfig);
};

module.exports = swellnetReportEmail;
