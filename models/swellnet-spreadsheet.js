const { GoogleSpreadsheet } = require('google-spreadsheet');
const config = require('../config');

const SwellnetSpreadsheet = new GoogleSpreadsheet(
  process.env.SWELLNET_SPREADSHEET_KEY
);

(async () => {
  try {
    await SwellnetSpreadsheet.useServiceAccountAuth({
      client_email: config.google_service_account.client_email,
      private_key: config.google_service_account.private_key,
    });

    await SwellnetSpreadsheet.loadInfo(); // loads document properties and worksheets
    console.log(
      `Successfully connected to google sheet - ${SwellnetSpreadsheet.title}`
    );
  } catch (err) {
    console.log(err);
  }
})();

module.exports = SwellnetSpreadsheet;
