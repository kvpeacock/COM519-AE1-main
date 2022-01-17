const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
//const { MONGODB_URI } = process.env;

//const client = new MongoClient(MONGODB_URI);

const { MONGODB_URI, MONGODB__PRODUCTION_URI } = process.env;

const client = new MongoClient(process.env.NODE_ENV === "production" ? MONGODB__PRODUCTION_URI : MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try{
        await client.connect();
        const db = client.db();
        const results = await db.collection("specifications").find({}).count();

        if (results){
            db.dropDatabase();
        }

        const load = loading("Loading specifications.").start();

        const data = await fs.readFile(path.join(__dirname, "vehicles.json"), "utf-8");
        await db.collection("specifications").insertMany(JSON.parse(data));

        //Creates manufacturer collection
        const VehicleManufacturersRef = await db.collection("specifications").aggregate([
            {$match: {manufacturer: {$ne: null}}},
            {
                $group: {
                    _id: "$manufacturer",
                    country : { "$first"  : "$manufacturer_country"},
                    founding_year: {"$first"  : "$founding_year"},
                    hq: {"$first"  : "$headquarters"},
                    type: {"$first"  : "$manufacturer_type"},
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    country : "$country",
                    founding_year: "$founding_year",
                    hq: "$hq",
                    type: "$type",
                },
            },
        ]);

        const manufacturers = await VehicleManufacturersRef.toArray();
        await db.collection("manufacturers").insertMany(manufacturers);
        
        const updatedManufacturersRef = db.collection("manufacturers").find({});
        const updatedManufacturers = await  updatedManufacturersRef.toArray();
        updatedManufacturers.forEach (async ({_id, name}) => {
            await db.collection("specifications").updateMany ( { manufacturer : name}, [
                {
                    $set: {
                        manufacturer_id: _id
                    },
                },
            ]);
        });
    //Creates reviews collection    
    const ReviewRef = await db.collection("specifications").aggregate([
        {$unwind : { path: "$reviews"}},
        {$match: {reviews: {$ne: null}}},
        { $group: {
            _id: "$reviews",
            vehicle: {"$first": "$_id"},
            review: {"$first": "$reviews"},
        }},

        {$project: {
            _id: 0,
            vehicle_id: "$vehicle",
            review_contents: "$review",
        },
    }]);
    const reviews = await ReviewRef.toArray();
    await db.collection("reviews").insertMany(reviews)

    load.stop();
    console.info("Loaded specifications.");

    process.exit();
    }catch(error){
        console.error("error:",error);
        process.exit();
    }
}

main()