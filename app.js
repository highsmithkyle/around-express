const express = require('express');
const helmet = require('helmet');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(router);
app.use(helmet());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at ${PORT}`);
});
