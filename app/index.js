const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

dotenv.config();

const itemRoutes = require("./modules/item/item.routes");
const userRoutes = require("./modules/auth/auth.routes");
const notFound = require("./modules/notfound/notFound.controller");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(
  cors({
    // origin: "https://sample-product-app-velpistikhes-projects.vercel.app",
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());

app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
