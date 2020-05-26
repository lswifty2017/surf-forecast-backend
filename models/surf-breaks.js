const { Sequelize } = require('sequelize');
  
const surfBreaksDB = sequelize.define('surf_breaks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  path: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  region: {
    type: Sequelize.STRING
  },
  beach: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
})

module.exports = surfBreaksDB;