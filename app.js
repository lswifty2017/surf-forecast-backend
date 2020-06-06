require('dotenv').config();

const express = require('express');
const cron = require('node-cron');
const { Op } = require('sequelize');
const moment = require('moment');

const routes = require('./routes/index');
const SwellnetForecasts = require('./models/schemas/swellnet-forecasts');
const scrapeSwellnet = require('./scrapers/swellnet/swellnet-scraper');

const app = express();
const port = process.env.PORT || process.env.DEV_PORT;

app.use('/', routes);

cron.schedule(
  '30 21 * * *',
  async () => {
    try {
      await SwellnetForecasts.destroy({
        where: {
          createdAt: {
            [Op.lte]: moment().subtract(2, 'days').toDate(),
          },
        },
      });
      await scrapeSwellnet();
    } catch (err) {
      console.log(err);
    }
  },
  {
    scheduled: true,
    timezone: 'Australia/Sydney',
  }
);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
