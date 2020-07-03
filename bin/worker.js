const scrapeSwellnet = require('../scrapers/swellnet/swellnet-scraper');
const SwellnetForecasts = require('../models/schemas/swellnet-forecasts');

(async () => {
  console.log('Cron jobs starting...');
  try {
    await SwellnetForecasts.destroy({
      where: {
        createdAt: {
          [Op.lte]: moment().subtract(2, 'days').toDate(),
        },
      },
    });
    await scrapeSwellnet();
  } catch (err) {
    console.log(err);
  }
})();
