const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const item = require("./modules/item/item.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use("/api", item);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`)
);
