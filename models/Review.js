const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    review_contents : {
      score : Number,
      reviewer : String,
      review_company : String,
      review_date : String,
      review_link : String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);






