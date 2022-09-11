const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Hospitals = require("../models/hospitalsModel");
const Requests = require("../models/requestsModel");
const { sendNotification } = require("../firbase/firebaseAdmin.service");
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
      console.log(geoPoints);
      3;
      return geoPoints;
    });
  } else {
    console.log("sorry this browser does not suppoort the location ");
  }
}

const getHospitals = catchAsyncErrors(async (req, res, next) => {
  const hospitals = await Hospitals.find();
  res.status(200).json({
    status: "success",
    hospitals,
  });
});

const createHospital = catchAsyncErrors(async (req, res, next) => {
  const hospital = await Hospitals.create(req.body);
  res.status(201).json({
    status: "success",
    hospital,
  });
});

const findTheNearestHospital = catchAsyncErrors(async (req, res, next) => {
  const { lat, lng } = req.body;

  await Requests.create({ user: "631da67edfdba1a88f6a8a5f" });
  Hospitals.collection.createIndex({ location: "2dsphere" });
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
  //
  for (let i of hospitals) {
    const payload = {
      token: i.device_id,
      notification: {
        title: `hello `,
        body: `this is a test message`,
      },
    };
    // to send notification
    await sendNotification(payload);
    //wait for some time 
    await sleep(10000);
    // if request to accepted then again go to next hospital
    const check_request_accepted = await checkRequest();
    if (check_request_accepted) break;
    else continue;
  }

  res.status(200).json({
    status: "success",
    hospitals,
  });
});

const checkRequest = async () => {
  const request = await Requests.findOne({
    user: "631da67edfdba1a88f6a8a5f",
  })
    .sort({ _id: -1 })
    .limit(1);
  if (request && request.status === "pending") return false;
  else return true;
};

// find hospitals in radius of 10km
const findHospitalsInRadius = catchAsyncErrors(async (req, res, next) => {
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

const acceptRequest = catchAsyncErrors(async (req, res, next) => {
  const { request_Id, hospital_id } = req.body;
  await Request.updateOne(
    { _id: request_Id },
    {
      $set: {
        status: "accepted",
        accepted_by: hospital_id,
      },
    }
  );
});

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports = {
  getHospitals,
  createHospital,
  findTheNearestHospital,
  findHospitalsInRadius,
  acceptRequest,
};
