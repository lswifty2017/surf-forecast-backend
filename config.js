require('dotenv').config();

const config = {
  aws: {
    rds: {
      user: process.env.RDS_USERNAME,
      host: process.env.RDS_HOSTNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT
    }
  }
};

module.exports = config;
