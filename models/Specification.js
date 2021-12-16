const mongoose = require("mongoose");
const { Schema } = mongoose;

const specificationSchema = new Schema(
  {
    manufacturer: String,
    model: String,
    submodel: String,
    year: { type: Number, minlength: 4, maxlength: 4},
    body_style: { type: String, enum: ["Saloon","Coupe","Estate","Hatchnback","Convertible","Minivan","SUV","Pickup Truck","Unknown"]},
    doors: Number,
    engine_displacement: Number,
    engine_arrangement: String,
    power: Number,
    torque: Number,
    fuel_type: { type: String, enum: ["Petrol", "Diesel", "Hybrid", "Electric", "Hydrogen", "Unknown"]},
    drivetrain: {type: String, enum: ["FF","FR","MR","RR","4WD", "Other", "Unknown"]},
    gears: Number,
    transmission: { type: String, enum:["MT", "AT"]},
    acceleration: Number,
    top_speed: Number,
    combined_mpg: Number,
    insurance_group: Number,
    luggage_capacity: Number,
    mass: Number,
    average_used_price: Number,

    manufacturer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Specification", specificationSchema);