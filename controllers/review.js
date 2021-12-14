const Review= require("../models/Review");

exports.list = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.render("reviews", { reviews: reviews });
  } catch (e) {
    res.status(404).send({ message: "unable to list reviews" });
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