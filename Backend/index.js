const App = require('./app');
require('dotenv').config();

App.listen(process.env.PORT || 8080, () => {
  console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`);
});
