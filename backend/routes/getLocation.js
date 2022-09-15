const express = require("express");
const {
  getHospitals,
  createHospital,
  findTheNearestHospital,
  findHospitalsInRadius,
  acceptRequest,
  loginUser
} = require("../controller/getLocation");
const router = express.Router();

router.route("/getHospitals").get(getHospitals).post(createHospital);
router.route("/hospital-login").post(loginUser);

router.route("/findTheNearestHospital").post(findTheNearestHospital);

router.route("/getHospitalInRadius").get(findHospitalsInRadius);
router.route("/acceptRequest").post(acceptRequest);

module.exports = router;
