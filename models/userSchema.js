const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  profile: {},
});

const User = mongoose.model("users", userSchema);
module.exports = User;
