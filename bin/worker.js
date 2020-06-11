const scrapeSwellnet = require('../scrapers/swellnet/swellnet-scraper');

(async () => {
  console.log('Cron jobs starting...');
  try {
    await scrapeSwellnet();
  } catch (err) {
    console.log(err);
  }
})();
