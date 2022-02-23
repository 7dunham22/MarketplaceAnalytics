const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    get() {
      return this.getDataValue('date').toLocaleString('en-US', {
        timeZone: 'UTC',
      });
    },
  },
});
