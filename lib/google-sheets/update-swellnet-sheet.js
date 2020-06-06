const moment = require('moment');
const SwellnetSpreadsheet = require('../../models/swellnet-spreadsheet');
const SwellnetForecasts = require('../../models/schemas/swellnet-forecasts');

const updateSwellnetSheet = async (scrapedData) => {
  try {
    const allForecasts = await SwellnetForecasts.findAll({
      raw: true,
    });

    allForecasts.map((forecast) => {
      forecast.date_time = moment(forecast.date_time).format(
        'DD-MM-YYYY HH:mm'
      );
      forecast.updatedAt = moment(forecast.updatedAt).format(
        'DD-MM-YYYY HH:mm'
      );
      forecast.createdAt = moment(forecast.createdAt).format(
        'DD-MM-YYYY HH:mm'
      );
    });

    const headerValues = Object.keys(allForecasts[0]);

    const torquayData = scrapedData.filter((data) => {
      if (data.beach === 'torquay') {
        data['createdAt'] = moment().format('DD-MM-YYYY');
        return data;
      }
    });

    const easternBeaches = scrapedData.filter((data) => {
      if (data.beach === 'eastern-beaches') {
        data['createdAt'] = moment().format('DD-MM-YYYY');
        return data;
      }
    });

    await SwellnetSpreadsheet.loadInfo();
    const surfForecastDbSheet = SwellnetSpreadsheet.sheetsById[1601577555];
    await surfForecastDbSheet.clear();

    const torquaySheet = SwellnetSpreadsheet.sheetsById[702695257];
    await torquaySheet.addRows(torquayData);

    const easternBeachesSheet = SwellnetSpreadsheet.sheetsById[552354219];
    await easternBeachesSheet.addRows(easternBeaches);

    await surfForecastDbSheet.setHeaderRow(headerValues);
    await surfForecastDbSheet.addRows(allForecasts);

    console.log('Inserted data into google sheet');
  } catch (err) {
    console.log(err);
  }
};

module.exports = updateSwellnetSheet;
