const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'store'
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  phone:{
    type: String
  },
  rating:{
    type: String
  },
  Catalogs: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);