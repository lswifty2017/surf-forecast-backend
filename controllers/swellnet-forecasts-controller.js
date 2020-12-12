const SwellnetForecasts = require('../models/schemas/swellnet-forecasts');
const scrapeSwellnet = require('../scrapers/swellnet/swellnet-scraper');
const { Op } = require('sequelize');
const moment = require('moment');

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

exports.scrapeAllForecasts = async () => {
  try {
    await SwellnetForecasts.destroy({
      where: {
        createdAt: {
          [Op.lte]: moment().subtract(2, 'days').toDate(),
        },
      },
    });
    await scrapeSwellnet();
    res.send('Scraping swellnet...');
  } catch (err) {
    console.log(err);
  }
};
