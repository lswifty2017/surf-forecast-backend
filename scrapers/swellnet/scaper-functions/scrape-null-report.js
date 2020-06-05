const moment = require('moment');

const createNullReport = (scrapedData) => {
  const nullReports = [];

  scrapedData.forEach((data) => {
    const nullReport = {
      path: data.path,
      date_time: data.date_time,
      null_values: [],
    };

    const entries = Object.entries(data);
    entries.forEach((entry) => {
      if (entry[1] === null) {
        nullReport.null_values.push(entry[0]);
      }
    });

    if (nullReport.null_values.length) {
      nullReports.push(nullReport);
    }
  });

  return nullReports;
};

module.exports = createNullReport;
