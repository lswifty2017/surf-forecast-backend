require('dotenv').config();

const config = {
  aws: {
    rds: {
      user: process.env.RDS_USERNAME,
      host: process.env.RDS_HOSTNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT
    },
    rds_test: {
      user: process.env.TEST_RDS_USERNAME,
      host: process.env.TEST_RDS_HOSTNAME,
      port: process.env.TEST_RDS_PORT,
      password: process.env.TEST_RDS_PASSWORD,
      uri: process.env.TEST_RDS_URI
    }
  }
};

module.exports = config;
