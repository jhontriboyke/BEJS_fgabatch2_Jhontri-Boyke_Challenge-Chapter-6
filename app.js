const express = require("express");
const errorHandler = require("./src/middlewares/error-handler.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Welcome page */
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome</h1>
    <p>This is part of my Binar Academy Bootcamp Challenge Chapter 6</p>
    <p>Go to <a href="./images">/images</a> endpoint</p>
    `);
});

const imagesRoute = require("./src/routes/image.routes");
app.use("/images", imagesRoute);

app.use(errorHandler);

module.exports = app;
