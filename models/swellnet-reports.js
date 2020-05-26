const { Sequelize } = require('sequelize');

const swellnetForecastsDB = sequelize.define('swellnet_forecasts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, 
    autoIncrement: true
  },
  path: {
    type: Sequelize.STRING
  },
  date_time: {
    type: Sequelize.DATE
  },
  surf_height: {
    type: Sequelize.STRING
  },
  wind_direction: {
    type: Sequelize.STRING
  },
  wind_speed: {
    type: Sequelize.FLOAT
  },
  primary_swell_height: {
    type: Sequelize.FLOAT
  },
  primary_swell_direction: {
    type: Sequelize.STRING
  },
  primary_swell_period: {
    type: Sequelize.FLOAT
  },
  secondary_swell_height: {
    type: Sequelize.FLOAT
  },
  secondary_swell_direction: {
    type: Sequelize.STRING
  },
  secondary_swell_period: {
    type: Sequelize.FLOAT
  },
  review: {
    type: Sequelize.TEXT
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
});