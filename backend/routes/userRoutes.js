const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  isLoggedIn,
} = require("../controller/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

const User = require("../models/userModel");

// set validation for not logged in user
router.get("/", isAuthenticatedUser, (req, res) => {
 alert("You are logged in");
}
);

// user can not go to home page if he is not logged in
router.get("/home", isAuthenticatedUser, (req, res) => {
  res.send("home");
}
);


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/me").get(getUserDetails);

router.route("/verify").get(isLoggedIn);


module.exports = router;