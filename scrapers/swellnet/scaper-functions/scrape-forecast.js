const puppeteer = require('puppeteer');

const scrapeSwellnetForecast = async path => {
  try {
    const splitPath = path.split('/');
    const country = splitPath[2];
    const region = splitPath[3];
    const beach = splitPath[4];

    const pageURL = `https://www.swellnet.com/${path}`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(pageURL);

    const swellForecast = await page.evaluate(() => {
      const scrapedSwellData = [];

      const forecastTableDays = document.querySelectorAll(
        '.forecast_text_wrapper .day'
      );

      forecastTableDays.forEach(day => {
        const date = day.querySelector('.summary .date_time_date').innerHTML;
        const forecastTimes = day.querySelectorAll('div.time:not(.summary)');

        forecastTimes.forEach(time => {
          const forecastByTime = {
            date: date
          };

          forecastByTime['time'] = time.querySelector('.date_time_time')
            ? time.querySelector('.date_time_time').innerHTML
            : null;

          forecastByTime['surf_height'] = time.querySelector(
            '.surf .scalar .amount'
          )
            ? time.querySelector('.surf .scalar .amount').innerHTML
            : null;

          forecastByTime['wind_direction'] = time.querySelector(
            '.wind .direction'
          )
            ? time.querySelector('.wind .direction').innerHTML
            : null;

          forecastByTime['wind_speed'] = time.querySelector('.wind .speed')
            ? time.querySelector('.wind .speed').innerHTML
            : null;

          forecastByTime['primary_swell_height'] = time.querySelector(
            '.primary .amount'
          )
            ? time.querySelector('.primary .amount').innerHTML
            : null;

          forecastByTime['primary_swell_period'] = time.querySelector(
            '.primary .period'
          )
            ? time.querySelector('.primary .period').innerHTML
            : null;

          forecastByTime['primary_swell_direction'] = time.querySelector(
            '.primary .direction'
          )
            ? time.querySelector('.primary .direction').innerHTML
            : null;

          forecastByTime['secondary_swell_height'] = time.querySelector(
            '.secondary .amount'
          )
            ? time.querySelector('.secondary .amount').innerHTML
            : null;

          forecastByTime['secondary_swell_period'] = time.querySelector(
            '.secondary .period'
          )
            ? time.querySelector('.secondary .period').innerHTML
            : null;

          forecastByTime['secondary_swell_direction'] = time.querySelector(
            '.secondary .direction'
          )
            ? time.querySelector('.secondary .direction').innerHTML
            : null;

          scrapedSwellData.push(forecastByTime);
        });
      });

      return scrapedSwellData;
    });

    swellForecast.forEach(forecast => {
      forecast['country'] = country;
      forecast['region'] = region;
      forecast['beach'] = beach;
      forecast['path'] = path;
    });

    await browser.close();
    return swellForecast;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = scrapeSwellnetForecast;
