const Specification = require("../../models/Specification");

exports.list =  async (req,res) => {

    const searchQuery = req.query.search;
    if (!searchQuery) {
        res.json([]);
    }

    try {
        const Result =  await Specification.find(
            { $text: { $search: searchQuery}},
            { score: { $meta: "textScore" }}
            ).sort( { score: { $meta: "textScore" } } ).limit(50)
        if (Result.length!=0){
            res.json(Result);
        }
    } 
    catch (error) {
        console.log(error);
        res.status(404).send({
            message: `could not perform search`,
        });
    }
}