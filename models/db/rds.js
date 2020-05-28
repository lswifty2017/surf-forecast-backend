const { Sequelize } = require('sequelize');
const { aws } = require('../../config');

const rdsConfig = aws.rds_test;

const rds = new Sequelize(rdsConfig.uri);

(async () => {
  try {
    await rds.authenticate();
    console.log('Connection to AWS RDS has been established successfully.');
  } catch (err) {
    console.log(err);
  }
})();

module.exports = rds;
