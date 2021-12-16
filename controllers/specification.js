const Specification = require("../models/Specification");

exports.list = async (req, res) => {
  try {
    const specifications = await Specification.find({});
    res.render("specifications", { specifications: specifications });
  } catch (e) {
    res.status(404).send({ message: "unable to list vehicles" });
  }
};

exports.create = async (req, res) => {
  try {
    const name = req.body.name;
    console.log(name)
    const specification = new Specification({ 
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      submodel: req.body.submodel,
      year: req.body.year,
      body_style: req.body.body_style,
      doors: req.body.doors,
      mass: req.body.mass,
      engine_displacement: req.body.displacement,
      engine_arrangement: req.body.arrangement,
      power: req.body.power,
      torque: req.body.torque,
      fuel: req.body.fuel,
      drivetrain: req.body.drivetrain,
      gears: req.body.gears,
      transmission: req.body.transmission,
      acceleration: req.body.acceleration,
      top_speed: req.body.top_speed,
      combined_mpg: req.body.combined_mpg,
      insurance_group: req.body.insurance_group,
      luggage_capacity: req.body.luggage_capacity,
      average_used_price: req.body.average_used_price,   
    });
    console.log(specification);
    await specification.save();
    res.redirect('/specifications')
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      res.render('create-specification', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  } 
}


exports.createView = async (req, res) => {
  try {
    const specifications = await Specification.find({});
    res.render("create-specification", {
      specifications: specifications,
      errors: {}
    });
  } catch (e) {
    res.status(404).send({
      message: `could not generate create data`,
    });
  }
}





exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Specification.findByIdAndRemove(id);
    res.redirect("/specifications");
  } catch (e) {
    res.status(404).send({
      message: `unable to delete record ${id}.`,
    });
  }
};