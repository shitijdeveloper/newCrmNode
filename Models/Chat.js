const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,  // Makes sure the message field is not empty
      trim: true,      // Trims extra spaces
      minlength: 1,    // Minimum length for the message
      maxlength: 500   // Optional: Maximum length for the message
    }
  },
  { timestamps: true }
);

// The model name should be in singular form
const Customer = mongoose.model('Message', customerSchema);

module.exports = Customer;
