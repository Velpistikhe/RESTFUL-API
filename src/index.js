const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const item = require("./modules/item/item.routes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", item);
app.use(errorHandler);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`)
);
