const User = require("../../models/User");
exports.create = async (req, res) => {
      const specificationId = req.body.id;
      if (  !specificationId || req.session.userID) {
        res.json({result: 'error'});
      }
      try {
        let Result = await User.findById(req.session.userID);
        let saved_specs = Result.saved_specifications;
        var duplicate = Boolean(false);
        saved_specs.forEach(saved_spec => {
          if (specificationId == saved_spec._id){
            duplicate = Boolean(true);
          }
        })
        if (duplicate == Boolean(false)){
          await User.updateOne({"_id": req.session.userID}, {$push:{saved_specifications: specificationId}})
        }
      } catch (e) {
        res.json({result: 'error could not add this vehicle to favourites'});
      }
}
exports.list = async (req, res) => {
  try {
    const userRef = await User.findOne({"_id": req.session.userID}).populate('saved_specifications');
    res.render('saved-specifications', {specifications: userRef.saved_specifications});
  } catch (e) {
    console.log(e);
    res.json({result: 'could not find user faves'});
  }
}

exports.delete = async (req, res) => {
  const specId = req.params.id
  try {
    await User.updateOne({"_id": req.session.userID}, {$pull:{saved_specifications: specId}},
    function(
      err
    ) {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/saved-specifications");
      }
    }).clone();
} catch (e) {
    console.log(e);
    res.status(404).send({
      message: `unable to remove vehicle.`,
    });
  }
};