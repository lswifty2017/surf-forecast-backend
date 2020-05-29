const moment = require('moment');

const createScrapeReport = scrapedData => {
  const nullReports = [];

  scrapedData.forEach(data => {
    const nullReport = {
      path: data.path,
      date_time: data.date_time,
      null_values: []
    };

    const entries = Object.entries(data);
    entries.forEach(entry => {
      if (entry[1] === null) {
        nullReport.nullValues.push(entry[0]);
      }
    });

    nullReports.push(nullReport);
  });

  return nullReports;
};

module.exports = createScrapeReport;
