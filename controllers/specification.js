const Manufacturer = require("../models/Manufacturer");
const Specification = require("../models/Specification");

exports.list = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find({});
    const specifications = await Specification.find({}).sort('manufacturer');
    res.render("specifications", { specifications: specifications, manufacturers: manufacturers });
  } catch (e) {
    res.status(404).send({ message: "unable to list vehicles" });
  }
};

exports.create = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.body.manufacturer_id);
    await Specification.create({ 
      manufacturer: manufacturer.name,
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
      fuel_type: req.body.fuel,
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
    res.redirect('/specifications');
  } catch (e) {
    if (e.errors) {
      const manufacturers = await Manufacturer.find({});
      res.render('create-specification', { errors: e.errors, manufacturers: manufacturers })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  } 
};

exports.createView = async (req, res) => {
  try {
    const specifications = await Specification.find({});
    const manufacturers = await Manufacturer.find({});
    res.render("create-specification", {
      specifications: specifications,
      manufacturers: manufacturers,
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
    const specification = await Specification.findById(id);
    const manufacturers = await Manufacturer.find({});
    res.render('update-specification', { 
      specification: specification, 
      manufacturers: manufacturers,
      id: id, 
      errors: {} 
    });
  } catch (e) {
    res.status(404).send({
      message: `could not find specification ${id}.`,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const manufacturer = await Manufacturer.findById(req.body.manufacturer_id);
    await Specification.findOneAndUpdate({ _id: id },
      {
        manufacturer: manufacturer.name,
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
        fuel_type: req.body.fuel,
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
    res.redirect('/specifications/?message=specification has been updated');
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      const specification = await Specification.findById(id);
      const manufacturers = await Manufacturer.find({});
      res.render('update-specification', { 
        specification: specification, 
        manufacturers: manufacturers,
        id: id, 
        errors: e.errors 
      });
      return;
    }
    res.status(404).send({
      message: `failed to update specification ${id}.`,
    });
  }
};

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