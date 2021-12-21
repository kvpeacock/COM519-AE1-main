const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
var bodyParser = require('body-parser')
require('dotenv').config();

const specificationController = require("./controllers/specification");
const manufacturerController = require("./controllers/manufacturer");
const reviewController = require("./controllers/review");
const specificationApiController = require("./controllers/api/specification")

const app = express();
app.set("view engine", "ejs");

const { WEB_PORT, MONGODB_URI } = process.env;
mongoose.set('runValidators', true);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/create-specification", specificationController.createView);
app.post("/create-specification", specificationController.create);
app.get("/specifications", specificationController.list);
app.get("/specifications/delete/:id", specificationController.delete);
app.get("/specifications/update/:id", specificationController.edit);
app.post("/specifications/update/:id", specificationController.update);

app.get("/search-specifications",(req,res) => {
  res.render('search-specifications', specificationApiController);
});
app.get("/api/search-specifications", specificationApiController.list);


app.get("/create-manufacturer", manufacturerController.createView);
app.post("/create-manufacturer", manufacturerController.create);
app.get("/manufacturers", manufacturerController.list);
app.get("/manufacturers/delete/:id", manufacturerController.delete);
app.get("/manufacturers/update/:id", manufacturerController.edit);
app.post("/manufacturers/update/:id", manufacturerController.update);

app.get("/", function(req,res){
  res.redirect('/specifications')
});

app.get("/reviews", reviewController.list);
app.get("/create-review", reviewController.createView);
app.post("/create-review", reviewController.create);
app.get("/reviews/delete/:id", reviewController.delete);
app.get("/reviews/update/:id", reviewController.edit);
app.post("/reviews/update/:id", reviewController.update);


app.listen(WEB_PORT, () => {
    console.log(
      `Listening at http://localhost:${WEB_PORT}`
    );
  });

  function getErrorObject(){
    try { throw Error('') } catch(err) { return err; }
}