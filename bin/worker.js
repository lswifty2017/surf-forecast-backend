const scrapeSwellnet = require('../scrapers/swellnet/swellnet-scraper');
const connectMongoDb = require('../models/waver-mongo-db');
const moment = require('moment');

(async () => {
  console.log('Cron jobs starting...');
  try {
    const client = await connectMongoDb('surf-forecast-db');

    await client.collection('swellnet-forecast-data-aus').deleteMany({
      date: {
        $lte: moment().subtract(3, 'days').toDate(),
      },
    });

    await scrapeSwellnet();
  } catch (err) {
    console.log(err);
  }
})();
