const Review= require("../models/Review");
const Specification = require("../models/Specification")

exports.list = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({'review_contents.review_date': -1});
    const specifications = await Specification.find({});
    res.render("reviews", { reviews: reviews, specifications: specifications});
  } catch (e) {
    res.status(404).send({ message: "unable to list reviews" });
  }
};

exports.create = async (req, res) => {
  console.log("HI")
  try {
    rb = req.body;
    await Review.create({ vehicle_id: rb.vehicle_id, review_contents: {score: rb.score, reviewer: rb.reviewer, review_company: rb.review_company, review_date: rb.review_date, review_link: rb.link} });
    res.redirect('/reviews')
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      const specifications = await Specification.find({});
      res.render('create-review', { errors: e.errors, specifications: specifications })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  } 
};

exports.createView = async (req, res) => {
  console.log("HI")
  try {
    const specifications = await Specification.find({});
    const reviews = await Review.find({});
    res.render("create-review", {
      specifications: specifications,
      reviews: reviews,
      errors: {}
    });

  } catch (e) {
    res.status(404).send({
      message: `could not generate create data`,
    });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const review = await Review.findById(id);
    const specifications = await Specification.find({});
    res.render('update-review', { 
      review: review, 
      specifications: specifications,
      id: id, 
      errors: {} 
    });
  } catch (e) {
    res.status(404).send({
      message: `could not find review ${id}.`,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  rb = req.body
  try {
    await Review.findOneAndUpdate({ _id: id },
      {
         vehicle_id: rb.vehicle_id,
         review_contents: {score: rb.score, reviewer: rb.reviewer, review_company: rb.review_company, review_date: rb.review_date, review_link: rb.link}
      });
    res.redirect('/reviews/?message=review has been updated');
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      const review = await review.findById(id);
      res.render('update-review', { 
        review: review,
        id: id, 
        errors: e.errors 
      });
      return;
    }
    res.status(404).send({
      message: `failed to update review ${id}.`,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Review.findByIdAndRemove(id);
    res.redirect("/reviews");
  } catch (e) {
    res.status(404).send({
      message: `unable to delete record ${id}.`,
    });
  }
};