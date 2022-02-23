/* eslint-disable no-undef */
const router = require('express').Router();
const Item = require('../database/item');

// api/items
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// api/items
router.post('/', async (req, res, next) => {
  try {
    let newItem = await Item.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (newItem) {
      newItem.quantity = (
        Number(newItem.quantity) + Number(req.body.quantity)
      ).toString();
      await Item.update(
        {
          quantity: newItem.quantity,
        },
        {
          where: { name: req.body.name },
        }
      );
    } else {
      newItem = await Item.create(req.body);
    }
    res.send(newItem);
  } catch (error) {
    next(error);
  }
});

// api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    res.send(item);
  } catch (error) {
    next(error);
  }
});

// api/items/:id
router.put('/:id', async (req, res, next) => {
  try {
    const targetItem = await Item.findByPk(req.params.id);
    const editedItem = req.body;
    const updatedItem = await targetItem.update(editedItem);
    console.log(updatedItem);
    res.send(updatedItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
