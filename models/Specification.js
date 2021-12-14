const mongoose = require("mongoose");
const { Schema } = mongoose;

const specificationSchema = new Schema(
  {
    manufacturer: String,
    model: String,
    submodel: String,
    year: Number,
    body_style: String,
    doors: Number,
    engine_displacement: Number,
    engine_arrangement: String,
    power: Number,
    torque: Number,
    fuel_type: String,
    drivetrain: String,
    gears: Number,
    transmission: String,
    acceleration: Number,
    top_speed: Number,
    combined_mpg: Number,
    insurance_group: Number,
    luggage_capacity: Number,
    mass: Number,
    average_used_price: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("specification", specificationSchema);