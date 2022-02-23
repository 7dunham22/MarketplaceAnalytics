const router = require('express').Router();

/* ADD THE MODEL ROUTES LATER, SUCH AS THESE.*/
// router.use('/users', require('./users')); // matches all requests to /api/users/
// router.use('/puppies', require('./puppies')); // matches all requests to  /api/puppies/
// router.use('/kittens', require('./kittens')); // matches all requests to  /api/kittens/

// router.get('/', (req, res, next) => {
//   try {
//     res.send('Specify a more precise api route');
//   } catch (error) {
//     next(error);
//   }
// });

router.use('/items', require('./items'));
router.use('/customers', require('./customers'));

router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
