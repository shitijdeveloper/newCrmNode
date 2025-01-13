const Customer = require('../Models/Lead'); // Assuming Customer is defined in your models
const express = require('express');
const jwt = require('jsonwebtoken');
// Route to create a new customer (lead)
const customer = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debug log for the request body

    const { 
      name, 
      email, 
      mobileno, 
      healthCondition, 
      city, 
      state, 
      address, 
      Zipcode, 
      createby // Expects this directly from the frontend
    } = req.body;

    const newCustomer = new Customer({
      name,
      email,
      mobileno,
      healthCondition,
      city,
      state,
      address,
      Zipcode,
      createby, // Set as provided in the request
    });

    await newCustomer.save();

    res.status(201).json({ 
      message: 'Customer created successfully!', 
      data: newCustomer 
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: 'Server Error. Please try again later.' });
  }
};




// Route to fetch all leads (customers)
const allLeads = async (req, res) => {
  try {
    const AllleadsFetching = await Customer.find();
    res.status(200).json({ AllleadsFetching });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Assuming you are using Express and the User's ID is available


// Route to fetch a lead by ID
const leadId = async (req, res) => {
  try {
    const lead = await Customer.findById(req.params.id); // Fetch by ID from params
    if (!lead) {
      return res.status(400).json({ message: 'Lead not found' });
    }
    res.status(200).json({ lead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Route to delete a lead by ID
const leadDelte = async (req, res) => {
  try {
    const lead = await Customer.findByIdAndDelete(req.params.id); // Delete by ID from params
    if (!lead) {
      return res.status(400).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead deleted successfully', data: lead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};




module.exports = {
  customer,
  allLeads,
  leadDelte,
  leadId, 
};
