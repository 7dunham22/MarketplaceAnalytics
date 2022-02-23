const router = require('express').Router();
const Customer = require('../database/customer');

// api/customers
router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    res.send(customers);
  } catch (error) {
    next(error);
  }
});

// api/customers
router.post('/', async (req, res, next) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.send(newCustomer);
  } catch (error) {
    next(error);
  }
});

// api/customers/:id
router.get('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    res.send(customer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
