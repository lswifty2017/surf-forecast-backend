require('dotenv').config();

const express = require('express');
const path = require('path');
const cron = require('node-cron');
const moment = require('moment');
const Routes = require('./lib/routes');
const getSwellnetData = require('./scrapers/swellnet/swellnet-scraper');

const { Sequelize } = require('sequelize');
const { Pool, Client } = require('pg');
const { aws } = require('./config');

const rdsConfig = aws.rds_test;
const app = express();
const port = process.env.DEV_PORT || '8002';

const sequelize = new Sequelize(rdsConfig.uri);

app.get('/', (req, res) => {
  res.status(200).send('Surf forecast backend');
});

// Testing

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to AWS RDS has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  try {
    const swellnetData = await getSwellnetData();
    await swellnetForecastsDB.bulkCreate(swellnetData);
  } catch (err) {
    console.log(err);
  }
})();

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
