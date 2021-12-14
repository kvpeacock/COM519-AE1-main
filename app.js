const mongoose = require("mongoose");
const express = require("express");
require('dotenv').config();

const specificationController = require("./controllers/specification");
const manufacturerController = require("./controllers/manufacturer");
const reviewController = require("./controllers/review");

const app = express();
app.set("view engine", "ejs");










const { WEB_PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});


app.get("/specifications", specificationController.list);
app.get("/specifications/delete/:id", specificationController.delete);

app.get("/manufacturers", manufacturerController.list);
app.get("/manufacturers/delete/:id", manufacturerController.delete);

app.get("/reviews", reviewController.list);
app.get("/reviews/delete/:id", reviewController.delete);



app.listen(WEB_PORT, () => {
    console.log(
      `Listening at http://localhost:${WEB_PORT}`
    );
  });