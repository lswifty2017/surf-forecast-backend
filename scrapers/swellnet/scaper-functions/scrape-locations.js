const puppeteer = require('puppeteer');

const scrapeSwellLocations = async () => {
  try {
    const pageURL = 'https://www.swellnet.com/reports/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(pageURL);

    const allLocationPaths = await page.evaluate(() => {
      const swellnetLocationPaths = [];

      const australianLocationsContainer = document.querySelector(
        '.pane-surf-locations-from-parent-locations-australia .location-accordian'
      );

      const locations = australianLocationsContainer.querySelectorAll(
        '.location-list a'
      );

      locations.forEach(location => {
        const locationPath = location.getAttribute('href');
        swellnetLocationPaths.push(`${locationPath}/forecast`);
      });

      return swellnetLocationPaths;
    });

    await browser.close();
    return allLocationPaths;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = scrapeSwellLocations;
