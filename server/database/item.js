const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  category: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'miscellaneous',
    validate: {
      notEmpty: true,
      isIn: [
        [
          'produce',
          'meats',
          'dairy',
          'household',
          'frozen',
          'pasta',
          'seafood',
          'bakery',
          'baking',
          'medical',
          'office',
          'spices',
          'condiments',
          'bath',
          'miscellaneous',
        ],
      ],
    },
  },

  quantity: {
    // NOTE: This only indicates the quantity of a particular item at a single addition/purchase. For the total quantity, query all instances of this model matching the category.
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true,
    },
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/15/e7/47c9886840b299bd24b6e48fca6e/7.Certified-Organic-Grocery-Store_2280x1282.jpg',
    // validate: {
    //   isUrl: true,
    // },
  },
});
