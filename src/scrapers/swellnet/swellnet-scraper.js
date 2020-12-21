const SwellnetForecasts = require('../../models/schemas/swellnet-forecasts');
const scrapeSwellLocations = require('./scaper-functions/scrape-locations');
const scrapeForecast = require('./scaper-functions/scrape-forecast');
const formatForecastData = require('./scaper-functions/format-forecast-data');
const createNullReport = require('./scaper-functions/scrape-null-report');
const swellnetReportEmail = require('../../lib/mailer/swellnet-report/swellnet-report-email');
const updateSwellnetSheet = require('../../lib/google-sheets/update-swellnet-sheet');
const connectMongoDb = require('../../models/waver-mongo-db');

const scrapeSwellnet = async (dev) => {
  try {
    let scrapeTimer = 0;
    let scrapeCount = 0;
    let bulkData = [];

    setInterval(() => {
      scrapeTimer += 1;
    }, 1000);

    console.log('Scraping swellnet...');

    const swellnetPaths = await scrapeSwellLocations();
    const paths = dev ? swellnetPaths.slice(0, 1) : swellnetPaths;

    for (const path of paths) {
      const forecastData = await scrapeForecast(path);
      const formattedData = formatForecastData(forecastData);
      bulkData = bulkData.concat(formattedData);

      scrapeCount += 1;
      console.log(
        `Scraped ${scrapeCount}/${swellnetPaths.length} swellnet reports`
      );
    }

    const client = await connectMongoDb('surf-forecast-db');

    console.log('Connected to connectMongoDb.');
    console.log('Bulk inserting data into swellnet-forecasts');
    await client.collection('swellnet-forecast-data-aus').insertMany(bulkData);

    // await SwellnetForecasts.bulkCreate(bulkData);

    if (!dev) {
      const scrapeReport = createNullReport(bulkData);
      await swellnetReportEmail(scrapeReport);
      await updateSwellnetSheet(bulkData);
    }

    console.log('Bulk swellnet data imported into db');
    console.log(
      `Scraping completed in ${Math.round(scrapeTimer / 60)} minutes`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = scrapeSwellnet;
