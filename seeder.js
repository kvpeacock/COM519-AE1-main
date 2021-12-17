const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { MONGODB_URI } = process.env;

const client = new MongoClient(MONGODB_URI);

async function main() {
    try{
        await client.connect();
        const db = client.db();
        const results = await db.collection("specifications").find({}).count();

        if (results){
            db.dropDatabase();
        }

        const load = loading("test").start();

        const data = await fs.readFile(path.join(__dirname, "vehicles.json"), "utf-8");
        console.log(data);
        await db.collection("specifications").insertMany(JSON.parse(data));

        //Creates manufacturer document
        const VehicleManufacturersRef = await db.collection("specifications").aggregate([
            {$match: {manufacturer: {$ne: null}}},
            {
                $group: {
                    _id: "$manufacturer",
                    country : { "$first"  : "$manufacturer_country"},
                    founding_year: {"$first"  : "$founding_year"},
                    hq: {"$first"  : "$headquarters"},
                    type: {"$first"  : "$manufacturer_type"},
                    models: { $sum : 1},
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
                    models: "$models",
                },
            },
        ]);

        const manufacturers = await VehicleManufacturersRef.toArray();
        await db.collection("manufacturers").insertMany(manufacturers);
        



        //Creates reviews document
        const VehicleReviewsRef = await db.collection("specifications").aggregate([
            {$match: {reviews: {$ne: null}}},
            {
                $group: {
                    _id: "$reviews",
                    model : { "$first" : "$model"},
                    reviews: { "$first" : "$reviews"}
                },
            },
            {
                $project: {
                    _id: 0,
                    model: "$model",
                    reviews: "$reviews",
                    
                },
            },
        ]);




        const reviews = await VehicleReviewsRef.toArray();
        console.info("Reviews:")
        console.info(reviews);
        await db.collection("reviews").insertMany(reviews)





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
           
    load.stop();
    console.info("DONE");

    process.exit();
    }catch(error){
        console.error("error:",error);
        process.exit();
    }
}

main()