const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  email : {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true
  }
  // Other user-related fields
}, { timestamps: true });


module.exports = mongoose.model('user', UserSchema);
