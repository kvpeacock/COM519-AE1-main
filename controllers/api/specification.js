const Specification = require("../../models/Specification");

exports.list =  async (req,res) => {

    const searchQuery = req.query.search;
    if (!searchQuery) {
        res.json([]);
    }

    try {
        const Result =  await Specification.find(
           {model: new RegExp(searchQuery,"i")}
         )
        res.json(Result);
        } 
    catch (error) {
        console.log(error);
        res.status(404).send({
            message: `could not perform search`,
        });
    }
}