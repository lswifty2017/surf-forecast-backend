const scrapeSwellLocations = require('./scaper-functions/scrape-locations');
const scrapeForecast = require('./scaper-functions/scrape-forecast');
const formatForecastData = require('./scaper-functions/format-forecast-data');
const swellnetForecastsDB = require('../')
const { chunkArr } = require('../../lib/helpers');

const getSwellnetData = async () => {
  try {
    console.log('Scraping swellnet...');
    let scrapeTimer = 0;
    let scrapeCount = 0;

    setInterval(() => {
      scrapeTimer += 1;
    }, 1000);

    const swellnetPaths = await scrapeSwellLocations();
    const chunkedPathData = chunkArr(swellnetPaths, 10);

    chunkedPathData.forEach((pathChunk) => {
      let bulkData = [];

      for (const path of pathChunk) {
        const forecastData = await scrapeForecast(path);
        const formattedData = formatForecastData(forecastData);
        bulkData = bulkData.concat(formattedData);
  
        scrapeCount += 1;
        console.log(
          `Scraped ${scrapeCount}/${swellnetPaths.length} swellnet reports`
        );
      }

      await swellnetForecastsDB.bulkCreate(bulkData);
    });

    console.log(
      `Scraping completed in ${Math.round(scrapeTimer / 60)} minutes`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = getSwellnetData;
