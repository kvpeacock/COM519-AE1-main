const mongoose = require("mongoose");
const express = require("express");
require('dotenv').config();

const specificationController = require("./controllers/specification");

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



app.listen(WEB_PORT, () => {
    console.log(
      `Listening at http://localhost:${WEB_PORT}`
    );
  });