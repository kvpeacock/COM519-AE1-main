const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const expressSession = require("express-session");
var bodyParser = require('body-parser')
require('dotenv').config();

const specificationController = require("./controllers/specification");
const manufacturerController = require("./controllers/manufacturer");
const reviewController = require("./controllers/review");
const specificationApiController = require("./controllers/api/specification")
const savedSpecificationApiController = require("./controllers/api/savedSpecification");
const userController = require("./controllers/user");
const User = require("./models/User");

const app = express();
app.set("view engine", "ejs");

const { PORT, MONGODB_URI } = process.env;
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

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) }, resave: true, saveUninitialized: true }))

app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

app.post("/join", userController.create);
app.get("/join", (req, res) => {
  res.render('create-user', { errors: {} })
});
app.get("/login", (req, res) => {
  res.render('login-user', { errors: {} })
});
app.post("/login", userController.login);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.get("/", function(req,res){
  res.redirect('/specifications')
});

app.get("/create-manufacturer", authMiddleware, (req, res) => {
  res.render("create-manufacturer", { errors: {} });
});

app.get("/saved-specifications", savedSpecificationApiController.list);
app.get("/saved-specifications/delete/:id", savedSpecificationApiController.delete);
app.post("/saved-specifications", savedSpecificationApiController.create);

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

app.get("/reviews", reviewController.list);
app.get("/create-review", reviewController.createView);
app.post("/create-review", reviewController.create);
app.get("/reviews/delete/:id", reviewController.delete);
app.get("/reviews/update/:id", reviewController.edit);
app.post("/reviews/update/:id", reviewController.update);



app.listen(PORT, () => {
    console.log(
      `Listening at http://localhost:${PORT}`
    );
  });
