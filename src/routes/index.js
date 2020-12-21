const express = require('express');
const router = express.Router();
const { getAllForecasts, scrapeAllForecasts, getForecast } = require('../controllers/swellnet-forecasts-controller');

router.get('/swellnet/getForecasts', getAllForecasts);
router.get('/swellnet/getForecast/:location', getForecast)
router.get('/swellnet/scrape', scrapeAllForecasts);

module.exports = router;
