require('dotenv').config();

const express = require('express');
const cron = require('node-cron');
const routes = require('./routes/index');
const scrapeSwellnet = require('./scrapers/swellnet/swellnet-scraper');

const app = express();
const port = process.env.DEV_PORT || '8002';

app.use('/', routes);

cron.schedule('0 12 * * *', async () => {
  try {
    await scrapeSwellnet();
    console.log('running a task every minute');
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
