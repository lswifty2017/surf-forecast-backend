const config = require('config');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const swellnetSpreadsheet = new GoogleSpreadsheet(
  process.env.SWELLNET_SPREADSHEET_KEY
);

(async () => {
  try {
    await swellnetSpreadsheet.useServiceAccountAuth({
      client_email: config.get('google_service_account.client_email'),
      private_key: config.get('google_service_account.private_key'),
    });

    await swellnetSpreadsheet.loadInfo(); // loads document properties and worksheets
    console.log(
      `Successfully connected to google sheet - ${swellnetSpreadsheet.title}`
    );
  } catch (err) {
    console.log(err);
  }
})();

module.exports = swellnetSpreadsheet;
