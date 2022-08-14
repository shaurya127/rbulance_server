const express = require("express");
const { getHospitals, createHospital, findTheNearestHospital, findHospitalsInRadius } = require("../controller/getLocation");
const router = express.Router();

router.route("/getHospitals").get(getHospitals).post(createHospital);

router.route("/findTheNearestHospital").post(findTheNearestHospital);

router.route("/getHospitalInRadius").get(findHospitalsInRadius);


module.exports = router;
