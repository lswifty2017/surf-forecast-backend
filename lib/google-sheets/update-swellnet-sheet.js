const SwellnetSpreadsheet = require('../../models/swellnet-spreadsheet');
const SwellnetForecasts = require('../../models/schemas/swellnet-forecasts');
const moment = require('moment');

const updateSwellnetSheet = async (req, res) => {
  try {
    const allForecasts = await SwellnetForecasts.findAll({
      raw: true,
    });

    const headerValues = Object.keys(allForecasts[0]);

    await SwellnetSpreadsheet.loadInfo();
    const prevSheet = SwellnetSpreadsheet.sheetsByIndex[1];
    await prevSheet.delete();

    const sheet = await SwellnetSpreadsheet.addSheet({
      title: `Swellnet Forecast Data - Updated ${moment().format(
        'DD-MM-YYYY'
      )}`,
      headerValues: headerValues,
    });

    await sheet.addRows(allForecasts);

    console.log('Inserted data into google sheet');
  } catch (err) {
    console.log(err);
  }
};

module.exports = updateSwellnetSheet;
