const scrapeSwellLocations = require('./scaper-functions/scrape-locations');
const scrapeForecast = require('./scaper-functions/scrape-forecast');
const formatForecastData = require('./scaper-functions/format-forecast-data');

const getSwellnetData = async () => {
  try {
    console.log('Scraping swellnet');
    let scrapeTimer = 0;

    setInterval(() => {
      scrapeTimer += 1;
    }, 1000);

    const bulkData = [];

    const swellnetPaths = await scrapeSwellLocations();

    for (const path of swellnetPaths) {
      const forecastData = await scrapeForecast(path);
      const formattedData = formatForecastData(forecastData);
      bulkData.concat(formattedData);
    }

    console.log(
      `Scraping completed in ${Math.round(scrapeTimer / 60)} minutes`
    );

    return bulkData;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getSwellnetData;
