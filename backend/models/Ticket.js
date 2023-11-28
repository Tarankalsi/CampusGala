const mongoose = require('mongoose');
const { Schema } = mongoose;
const ticketSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events',
        required: true
    }
    // Other ticket-related fields
}, { timestamps: true });


module.exports = mongoose.model('Ticket', ticketSchema);
