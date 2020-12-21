require('dotenv').config();

const express = require('express');
const cron = require('node-cron');
const { Op } = require('sequelize');
const moment = require('moment');

const routes = require('./src/routes/index');
const SwellnetForecasts = require('./src/models/schemas/swellnet-forecasts');
const scrapeSwellnet = require('./src/scrapers/swellnet/swellnet-scraper');

const app = express();
const port = process.env.PORT || process.env.DEV_PORT;

app.use('/', routes);

// Dev

// (async () => {
//   try {
//     await scrapeSwellnet(true);
//   } catch (err) {
//     console.log(err);
//   }
// })();

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
