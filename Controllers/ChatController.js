const express = require('express');
const Customer=require('../Models/Chat')
const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Create a new message instance
    const newMessage = new Customer({
      message: message
    });

    // Save the new message to the database
    const result = await newMessage.save();

    // Send a success response with the saved message
    res.status(201).json({ message: "Message saved", data: result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const chatget = async (req, res) => {
    try {
      const chat = await Customer.find(); // Retrieve all messages from the database
      
      if (chat.length === 0) { // Check if there are no messages
        return res.status(404).json({ message: "No chat found" }); // Use 404 for "not found"
      }
  
      res.status(200).json({ chat }); // Send the chat messages in the response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" }); // Internal server error
    }
  };
  
module.exports={
    chat,
    chatget
}
