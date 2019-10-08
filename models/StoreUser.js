const mongoose = require("mongoose");

const StoreUserSchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store"
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
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: String,
    required: true  
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = StoreUser = mongoose.model("store", StoreUserSchema);
