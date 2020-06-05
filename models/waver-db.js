const { Sequelize } = require('sequelize');
const config = require('config');

const db = new Sequelize(config.get('heroku.pg_db'));

(async () => {
  try {
    await db.authenticate();
    console.log(
      'Connection to heroku postgres DB has been established successfully.'
    );
  } catch (err) {
    console.log(err);
  }
})();

module.exports = db;
