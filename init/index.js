const mongoose=require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
if(process.env.NODE_ENV != "production"){ 
   require('dotenv').config(); 
}

// //Mapbox setup // //
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken =process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({
  accessToken: mapToken,
});

const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";

main()
   .then(()=>{
    console.log("connected to DB");
   })
   .catch((err)=>{
    console.log(err);
   });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB =async ()=>{
    await Listing.deleteMany({});
    console.log("Data Deleted");

    //initData.data = initData.data.map((obj) => ({...obj,owner:"69773bff7f548e76a106cb0e"}));

    // // Add owner + auto-generate geometry // //
  for (let obj of initData.data) {

    // //Get coordinates from location // //
    let response = await geocodingClient
      .forwardGeocode({
        query: obj.location,
        limit: 1,
      })
      .send();

    obj.owner = "69773bff7f548e76a106cb0e";

    obj.geometry = response.body.features[0].geometry;
  }



    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();