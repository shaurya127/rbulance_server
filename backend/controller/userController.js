const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  const token = user.getJWTToken();
  sendToken(user, 201, res);
});

// LOGIN a User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 401));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  sendToken(user, 200, res);
});
// logout our user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
// get the details of the user (i made this for profile in case required)
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  // console.log(req);
  const user = await User.findById(req.body.user._id);
  // only accesible after login soo we need to check if user is present
  if (!user) {
    return next(new ErrorHandler("No user found", 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// route for verify logged in user
exports.isLoggedIn = catchAsyncErrors(async (req, res, next) => {
  // console.log(req);
   const user = await User.findById(req.body.user._id);
    if (!user) {
      return next(new ErrorHandler("No user found", 404));
    }
    res.status(200).json({
      success: true,
      data: user,
    });

}
);
