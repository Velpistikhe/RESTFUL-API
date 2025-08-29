const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const item = require("./modules/item/item.routes");
const notFound = require("./modules/notfound/notFound.controller");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

app.use(
  cors({ origin: "https://sample-product-app.vercel.app/", credentials: true })
);
app.use(express.json());

app.use("/api", item);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`)
);
