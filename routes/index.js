const express = require('express');
const router = express.Router();
const swellnetForecastsController = require('../controllers/swellnet-forecasts-controller');

router.get('/swellnet/forecasts', swellnetForecastsController.getAllForecasts);
router.get('/swellnet/scrape', swellnetForecastsController.scrapeAllForecasts);
module.exports = router;
