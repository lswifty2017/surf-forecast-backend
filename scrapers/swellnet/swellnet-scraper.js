const scrapeSwellLocations = require('./scaper-functions/scrape-locations');
const scrapeForecast = require('./scaper-functions/scrape-forecast');
const formatForecastData = require('./scaper-functions/format-forecast-data');

const getSwellnetData = async () => {
  try {
    console.log('Scraping swellnet');
    let scrapeTimer = 0;
    let scrapeCount = 0;

    setInterval(() => {
      scrapeTimer += 1;
    }, 1000);

    let bulkData = [];

    const swellnetPaths = await scrapeSwellLocations();

    const samplePaths = swellnetPaths.slice(0, 2);

    for (const path of samplePaths) {
      // set to first 2 of 132 locations
      const forecastData = await scrapeForecast(path);
      const formattedData = formatForecastData(forecastData);
      bulkData = bulkData.concat(formattedData);

      console.log(bulkData);
      scrapeCount += 1;
      console.log(
        `Scraped ${scrapeCount}/${swellnetPaths.length} swellnet reports`
      );
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
