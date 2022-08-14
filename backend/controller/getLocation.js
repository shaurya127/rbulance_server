const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Hospitals = require("../models/hospitalsModel");
const geolib = require("geolib");

let milesToRadian = function (miles) {
  var earthRadiusInMiles = 3963;
  return miles / earthRadiusInMiles;
};
let kmToRadian = function (miles) {
  var earthRadiusInMiles = 6378;
  return miles / earthRadiusInMiles;
};
// function to get the coordinates of user .
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let geoPoints = [position.coords.latitude, position.coords.longitude];
      console.log(geoPoints);3
      return geoPoints;
    });
  } else {
    console.log("sorry this browser does not suppoort the location ");
  }
}

exports.getHospitals = catchAsyncErrors(async (req, res, next) => {
  const hospitals = await Hospitals.find();
  res.status(200).json({
    status: "success",
    hospitals,
  });
});

exports.createHospital = catchAsyncErrors(async (req, res, next) => {
  const hospital = await Hospitals.create(req.body);
  res.status(201).json({
    status: "success",
    hospital,
  });
});

exports.findTheNearestHospital = catchAsyncErrors(async (req, res, next) => {
  const { lat, lng } = req.body;
  console.log(lat ,lng );
  
  Hospitals.collection.createIndex({ location: '2dsphere' });
  const hospitals = await Hospitals.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      },
    },
  });
  res.status(200).json({
    status: "success",
    hospitals,
  });
});


// find hospitals in radius of 10km
exports.findHospitalsInRadius = catchAsyncErrors(async (req, res, next) => {
  const { lat, lng } = req.body;
  var query = {
    location: {
      $geoWithin: {
        $centerSphere: [[lat, lng], milesToRadian(req.query.radius)],
      },
    },
  };
  const hospitals = await Hospitals.find(query);

  res.status(200).json({
    status: "true",
    hospitals,
  });
});
