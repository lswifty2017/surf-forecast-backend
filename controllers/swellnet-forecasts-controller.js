const SwellnetSpreadsheet = require('../models/swellnet-spreadsheet');
const SwellnetForecasts = require('../models/schemas/swellnet-forecasts');

exports.getAllForecasts = async (req, res) => {
  try {
    const allForecasts = await SwellnetForecasts.findAll({
      raw: true,
    });

    res.send(allForecasts);
  } catch (err) {
    res.send(err);
  }
};
