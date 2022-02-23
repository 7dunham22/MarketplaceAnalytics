const { db } = require('./server/database');
const app = require('./server');
const PORT = process.env.PORT || 3000;

db.sync().then(() => {
  app.listen(PORT, function () {
    console.log('Knock, knock');
    console.log("Who's there?");
    console.log(`Your server, listening on port ${PORT}`);
  });
});
