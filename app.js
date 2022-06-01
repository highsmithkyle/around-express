const express = require("express");
const helmet = require("helmet");
const router = require("./routes");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");

// , {
//   // useNewUrlParser: true,
//   // useCreateIndex: true,
//   // useFindAndModify: false
// });

app.use(router);
app.use(helmet());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at ${PORT}`);
});
