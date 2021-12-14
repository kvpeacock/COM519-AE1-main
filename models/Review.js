const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    score : Number,
    reviewer : String,
    review_company : String,
    review_date : String,
    review_link : String
  },
  { timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);





