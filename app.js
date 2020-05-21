const express = require('express');
const path = require('path');
const cron = require('node-cron');
const moment = require('moment');
const { Sequelize } = require('sequelize');
const { Pool, Client } = require('pg');
const { aws } = require('./config');
require('dotenv').config();

const getSwellnetData = require('./scrapers/swellnet/swellnet-scraper');

const rdsConfig = aws.rds_test;
const app = express();
const port = process.env.DEV_PORT || '8002';

app.get('/', (req, res) => {
  res.status(200).send('Surf forecast backend');
});

// Testing

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

(async () => {
  // const client = new Client(rdsConfig);
  // await client.connect(err => {
  //   if (err) {
  //     console.error('connection error', err.stack);
  //   } else {
  //     console.log('connected');
  //   }
  // });
  // client.query('SELECT * FROM swellnet_forecast', (err, res) => {
  //   console.log(err, res);
  //   client.end();
  // });

  const sequelize = new Sequelize(rdsConfig.uri);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const swellnetForecastDB = sequelize.define('swellnet_forecasts', {
    date_time: {
      type: Sequelize.DATE,
      primaryKey: true
    },
    path: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    region: {
      type: Sequelize.STRING
    },
    beach: {
      type: Sequelize.STRING
    },
    surf_height: {
      type: Sequelize.STRING
    },
    wind_direction: {
      type: Sequelize.STRING
    },
    wind_speed: {
      type: Sequelize.FLOAT
    },
    primary_swell_height: {
      type: Sequelize.FLOAT
    },
    primary_swell_direction: {
      type: Sequelize.STRING
    },
    primary_swell_period: {
      type: Sequelize.FLOAT
    },
    secondary_swell_height: {
      type: Sequelize.FLOAT
    },
    secondary_swell_direction: {
      type: Sequelize.STRING
    },
    secondary_swell_period: {
      type: Sequelize.FLOAT
    },
    review: {
      type: Sequelize.TEXT
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  });

  try {
    const swellnetData = await getSwellnetData();
    console.log(swellnetData);
    // const swellnetData = [{ date: moment() }];
    await swellnetForecastDB.bulkCreate(swellnetData);
    console.log('Successfully inserted scraped data into DB');
  } catch (err) {
    console.log(err);
  }
})();

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
