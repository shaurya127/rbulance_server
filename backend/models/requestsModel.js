const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },

  accepted_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Hospitals",
    required: false,
  },

  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Requests = mongoose.model("Requests", requestSchema);
module.exports = Requests;
