const express = require("express");
const errorHandler = require("./src/middlewares/error-handler.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const imagesRoute = require("./src/routes/image.routes");
app.use("/images", imagesRoute);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
