require('dotenv').config();

const express = require('express');
const cron = require('node-cron');
const scrapeSwellnet = require('./scrapers/swellnet/swellnet-scraper');

const app = express();
const port = process.env.DEV_PORT || '8002';

app.get('/', (req, res) => {
  res.status(200).send('Surf forecast backend');
});

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

(async () => {
  try {
    await scrapeSwellnet();
  } catch (err) {
    console.log(err);
  }
})();

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
