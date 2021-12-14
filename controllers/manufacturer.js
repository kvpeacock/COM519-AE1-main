const Manufacturer= require("../models/Manufacturer");

exports.list = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find({});
    res.render("manufacturers", { manufacturers: manufacturers });
  } catch (e) {
    res.status(404).send({ message: "unable to list manufacturers" });
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