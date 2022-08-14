const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt= require("jsonwebtoken");
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token }= req.cookies
    if(!token) return next(new ErrorHandler("You are not logged in", 401));

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
    
});

