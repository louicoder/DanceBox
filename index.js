const App = require('express')();
// const Cors = require('cors');
require('dotenv').config();

// App.use(Cors());

App.listen(process.env.PORT || 8080, () => {
  console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT || 8080}`);
});
