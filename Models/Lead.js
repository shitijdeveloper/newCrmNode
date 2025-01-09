const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileno: { 
    type: String, 
    required: true, 
    match: /^[0-9]{10}$/ 
  },
  healthCondition: { type: String, default: null }, 
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  Zipcode: {
    type: String,
   type:Number
  },
  
  status: { type: String, default: 'pending' }, 
  canceled: { type: Boolean, default: false }, 
  createby: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users', 
    default: null 
  }
}, { timestamps: true });

const Customer = mongoose.model('customers', customerSchema);
module.exports = Customer;
