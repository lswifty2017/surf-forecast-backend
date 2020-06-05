require('dotenv').config();

const express = require('express');
const cron = require('node-cron');
const routes = require('./routes/index');
const scrapeSwellnet = require('./scrapers/swellnet/swellnet-scraper');
const updateSwellnetSheet = require('./lib/google-sheets/update-swellnet-sheet');

const app = express();
const port = process.env.DEV_PORT || '8002';

app.use('/', routes);

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

(async () => {
  try {
    await scrapeSwellnet();
    // await updateSwellnetSheet();
  } catch (err) {
    console.log(err);
  }
})();

// (async () => {
//   try {

//   }
//   catch(err) {
//     console.log(err)
//   }
// })();

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
