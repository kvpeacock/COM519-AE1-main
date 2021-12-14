const mongoose = require("mongoose");
const { Schema } = mongoose;

const manufacturerSchema = new Schema(
  {
    name: String,
    country : String,
    founding_year: String,
    hq: String,
    type: String,
    models: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("manufacturer", manufacturerSchema);