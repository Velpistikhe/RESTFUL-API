const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

dotenv.config();

const productRoutes = require("./modules/product/product.route");
const itemRoutes = require("./modules/item/item.routes");
const userRoutes = require("./modules/auth/auth.routes");
const notFound = require("./modules/notfound/notFound.controller");
const errorHandler = require("./middlewares/errorHandler");
const csrfProtection = require("./middlewares/csrfProtection");
const setupCsrfToken = require("./utils/setupCsrfToken");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(helmet());
app.use(cookieParser());

app.get("/api/csrf-token", csrfProtection, setupCsrfToken);
app.use("/api/v1/produk", productRoutes);
app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
