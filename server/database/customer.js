const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('customer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
