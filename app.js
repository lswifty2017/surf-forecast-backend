const express = require('express');
const path = require('path');
const scrapeSwellnet = require('./scrapers/swellnet/swellnet-scraper');

const app = express();
const port = process.env.PORT || '8002';

app.get('/', (req, res) => {
  res.status(200).send('Surf forecast backend');
});

// Testing puppeteer

scrapeSwellnet('australia', 'new-south-wales', 'eastern-beaches').then(res => {
  console.log(res);
});

//

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
