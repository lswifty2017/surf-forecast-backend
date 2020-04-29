const express = require('express');
const path = require('path');
const cron = require('node-cron');

const scrapeSwellLocations = require('./scrapers/swellnet/scaper-functions/scrape-locations');

const app = express();
const port = process.env.PORT || '8002';

app.get('/', (req, res) => {
  res.status(200).send('Surf forecast backend');
});

// Testing

scrapeSwellLocations().then(res => {
  console.log(res);
});

//

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
