const scrapeSwellLocations = require('./scaper-functions/scrape-locations');
const scrapeForecast = require('./scaper-functions/scrape-forecast');

const getSwellnetData = async () => {
  try {
    const bulkData = [];

    const swellnetPaths = await scrapeSwellLocations();
    const foreCastData = await scrapeForecast(swellnetPaths[20]);

    return foreCastData;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getSwellnetData;
