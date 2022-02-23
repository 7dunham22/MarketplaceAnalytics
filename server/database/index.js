const db = require('./database');
const Customer = require('./customer');
const Order = require('./order');
const Item = require('./item');

Customer.hasMany(Order);
Order.belongsTo(Customer);

Order.belongsToMany(Item, { through: 'OrderItems' });
Item.belongsToMany(Order, { through: 'OrderItems' });

module.exports = {
  db,
  Customer,
  Order,
  Item,
};
