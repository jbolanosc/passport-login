const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'Active'
  },
  rating: {
    type: Number,
    default: 5
  },
  phone: {
    type: String,
    required: true
  },
  phoneAuth: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("user", UserSchema);
