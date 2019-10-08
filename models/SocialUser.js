const mongoose = require("mongoose");

const  SocialUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  googleId:{
    type: String,
    required: true
  },
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
    //unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  phone: {
    type: String
  },
  phoneAuth: {
    type: Boolean
  }
});

module.exports = SocialUser = mongoose.model("SocialUser", SocialUserSchema);