const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.listen(process.env.APP_PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`)
);
