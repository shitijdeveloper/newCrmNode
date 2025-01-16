const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileno: { type: Number, required: true },
  complaint: { 
    type: String, 
    required: true, 
    maxlength: 500 // Set your desired maximum length here
  },
}, 
{ timestamps: true });

const Complaint = mongoose.model('Complaint', ComplaintSchema);
module.exports = Complaint;
