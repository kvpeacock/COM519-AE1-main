const mongoose = require("mongoose");
const { Schema } = mongoose;

const specificationSchema = new Schema(
  {
    manufacturer: {type: String, required: [true, "Manufacturer is required"]},
    model: { type: String, required: [true, "Model is required"]},
    submodel: String,
    year: { type: Number,
      validate : {
        validator : function(val){
          if (val === null){
            return true
          }
          return val.toString().length === 4 
        },
        message: "Year must be 4 digits"
      }
    },
    body_style: { type: String, enum: ["Saloon","Coupe","Estate","Hatchback","Convertible","Minivan","SUV","Pickup Truck",""]},
    doors: Number,
    engine_displacement: Number,
    engine_arrangement: String,
    power: Number,
    torque: Number,
    fuel_type: { type: String, enum: ["Petrol", "Diesel", "Hybrid", "Electric", "Hydrogen", "Other", ""]},
    drivetrain: {type: String, enum: ["FF","FR","MR","RR","4WD", "Other", ""]},
    gears: Number,
    transmission: { type: String, enum:["MT", "AT",""]},
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

specificationSchema.index({"$**": 'text'});
module.exports = mongoose.model("Specification", specificationSchema);
