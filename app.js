const express = require('express');
const path = require('path');
const cron = require('node-cron');
const { Pool, Client } = require('pg');
const { aws } = require('./config');
require('dotenv').config();

const getSwellnetData = require('./scrapers/swellnet/swellnet-scraper');

const rdsConfig = aws.rds;
const app = express();
const port = process.env.DEV_PORT || '8002';

app.get('/', (req, res) => {
  res.status(200).send('Surf forecast backend');
});

// Testing

getSwellnetData().then(res => {
  console.log(res);
});

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

(async () => {
  const client = new Client(rdsConfig);

  await client.connect(err => {
    if (err) {
      console.error('connection error', err.stack);
    } else {
      console.log('connected');
    }
  });
})();

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
