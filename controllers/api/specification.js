const Specification = require("../../models/Specification");

exports.list =  async (req,res) => {

    const searchQuery = req.query.search;
    if (!searchQuery) {
        res.json([]);
    }

    try {
        const Result =  await Specification.find(
            {manufacturer: {"$regex": searchQuery, "$options" : "i"}})
        if (Result.length!=0){
            res.json(Result);
        }
        else(res.json([]))
    } 
    catch (error) {
        console.log(error);
        res.status(404).send({
            message: `could not perform search`,
        });
    }
}
