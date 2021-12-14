const Specification = require("../models/Specification");

exports.list = async (req, res) => {
  try {
    const specifications = await Specification.find({});
    res.render("specifications", { specifications: specifications });
  } catch (e) {
    res.status(404).send({ message: "unable to list vehicles" });
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