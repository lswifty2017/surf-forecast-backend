const moment = require('moment');
const scrapeSwellnet = require('../scrapers/swellnet/swellnet-scraper');
const connectMongoDb = require('../models/waver-mongo-db');


const getAllForecasts = async (req, res) => {
  try {
    const surfForecastDb = await connectMongoDb('surf-forecast-db');

    await surfForecastDb.collection('swellnet-forecast-data-aus').find().limit(20).toArray((error, documents) => {
      res.send(documents)
    })

  } catch (err) {
    console.log(err)
    res.send(err);
  }
};

const scrapeAllForecasts = async (req, res) => {
  try {
    await scrapeSwellnet();
    res.send('Scraping swellnet...');
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getForecast = async (req, res) => {
  try {
    const surfForecastDb = await connectMongoDb('surf-forecast-db');

    await surfForecastDb.collection('swellnet-forecast-data-aus').find({ 'beach': req.params.location }).limit(20).sort({ 'date_created': -1 }).toArray((error, documents) => {
      res.send(documents)
    })

  } catch (err) {
    console.log(err)
    res.send(err);
  }
}

module.exports = {
  getAllForecasts,
  scrapeAllForecasts,
  getForecast
}
