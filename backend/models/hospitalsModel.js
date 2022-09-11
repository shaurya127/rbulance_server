const mongoose = require("mongoose");

const geocoder = require("../utils/geocoder");
const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: [true, "Please add address"],
  },
  hospital_device_id: {
    type: String,
    required: [false, "Please add id"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
hospitalSchema.pre("save", async function (next) {
  const location = await geocoder.geocode(this.address);
  //   console.log('location',location);

  this.location = {
    type: "Point",
    coordinates: [location[0].longitude, location[0].latitude],
    formattedAddress: location[0].formattedAddress,
  };

  next();
});

const hospital_Locations = mongoose.model("Hospitals", hospitalSchema);
module.exports = hospital_Locations;
