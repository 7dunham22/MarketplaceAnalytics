const { db, Customer, Order, Item } = require('./server/database');
const { green, red } = require('chalk');

const customers = ['David', 'Bob', 'Joe', 'Sandy', 'Sally', 'Jane'];

const items = [
  {
    name: 'tomato',
    category: 'produce',
    quantity: 30,
  },
  {
    name: 'orange',
    category: 'produce',
    quantity: 25,
  },
  {
    name: 'steak',
    category: 'meats',
    quantity: 25,
  },
  {
    name: 'swordfish',
    category: 'seafood',
    quantity: 10,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      customers.map((customer) => Customer.create({ name: customer }))
    );
    await Promise.all(items.map((item) => Item.create(item)));
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
