const mongoose = require("mongoose");
const { Schema } = mongoose;

const manufacturerSchema = new Schema(
  {
    name: { type: String, required: [true, "Manufacturer name is required"], unique: true },
    country : String,
    founding_year: { 
      type: Number, 
      validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      },
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
    hq: String,
    type: {type: String, enum: ["Brand","Division","Public","Private","Subsidiary","",]},
    models: {type: Number, default: 0}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Manufacturer", manufacturerSchema);

/*
manufacturerSchema.path('name').validate(async (value) => {
  const nameCount = await mongoose.models.Manufacturer.countDocuments({name: value });
  return !nameCount;
}, 'Manufacturer already exists');
*/

