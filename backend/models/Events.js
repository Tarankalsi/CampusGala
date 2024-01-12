const mongoose = require('mongoose');
const {Schema} = mongoose;

const EventSchema = new Schema({
  eventName: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  termsAndCondition: {
    type:String,
    required: true
  },
  ticketPrice : {
    type: Number,
    required: true
  },
  totalTickets:{
    type: Number,
    required: true
  },
  profileImage :{
    data: Buffer,
    contentType : String
  },
  // Other event-related fields
}, { timestamps: true });


module.exports = mongoose.model('event', EventSchema);
