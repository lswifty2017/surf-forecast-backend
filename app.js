require('dotenv').config();

const express = require('express');
const cron = require('node-cron');
const routes = require('./routes/index');
const scrapeSwellnet = require('./scrapers/swellnet/swellnet-scraper');

const app = express();
const port = process.env.PORT || process.env.DEV_PORT;

app.use('/', routes);

cron.schedule(
  '47 20 * * *',
  async () => {
    try {
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
