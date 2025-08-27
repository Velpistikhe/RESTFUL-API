const express = require("express");
const dotenv = require("dotenv");
const user = require("./modules/user/user.routes");

dotenv.config();

const app = express();

app.use(user);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`)
);
