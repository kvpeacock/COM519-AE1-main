const Manufacturer= require("../models/Manufacturer");

exports.list = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find({});
    res.render("manufacturers", { manufacturers: manufacturers });
  } catch (e) {
    res.status(404).send({ message: "unable to list manufacturers" });
  }
};

exports.create = async (req, res) => {
  try {
    const name = req.body.name;
    await Manufacturer.create({ name: req.body.name, country : req.body.country, founding_year: req.body.founding_year, hq : req.body.hq , type: req.body.type, models: "1" });
    res.redirect('/manufacturers')
  } catch (e) {
    if (e.code === 11000){
      res.render('create-manufacturer', { errors: e  })
    }
    else if (e.errors) {
      console.log(e.errors);
      res.render('create-manufacturer', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  } 
}


exports.createView = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find({});
    res.render("create-manufacturer", {
      manufacturers: manufacturers,
      errors: {}
    });

  } catch (e) {
    res.status(404).send({
      message: `could not generate create data`,
    });
  }
}


exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const manufacturer = await Manufacturer.findById(id);
    res.render('update-manufacturer', { 
      manufacturer: manufacturer, 
      id: id, 
      errors: {} 
    });
  } catch (e) {
    res.status(404).send({
      message: `could not find manufacturer ${id}.`,
    });
  }
}

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const manufacturer = await Manufacturer.findOneAndUpdate({ _id: id }, { 
      name: req.body.name,
      founding_year: req.body.founding_year,
      hq: req.body.hq,
      type: req.body.type
    });
    res.redirect('/manufacturers/?message=manufacturer has been updated');
  } catch (e) {
    if (e.code === 11000){
      const manufacturer = await Manufacturer.findById(id);
      res.render('update-manufacturer', { 
        manufacturer: manufacturer, 
        id: id, 
        errors: e
      });
    }
    else if (e.errors) {
      console.log(e.errors);
      const manufacturer = await Manufacturer.findById(id);
      res.render('update-manufacturer', { 
        manufacturer: manufacturer, 
        id: id, 
        errors: e.errors 
      });
      return;
    }
    res.status(404).send({
      message: `failed to update manufacturer ${id}.`,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Manufacturer.findByIdAndRemove(id);
    res.redirect("/manufacturers");
  } catch (e) {
    res.status(404).send({
      message: `unable to delete record ${id}.`,
    });
  }
};