const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app=express()
const userRouters=require('./Routers/userRouters')
const leadRouters=require('./Routers/leadRouter')
const Customer=require('./Models/Lead')
app.use(cors());
app.use(express.json());
// MongoDB connection URI
const mongoDBURI = 'mongodb+srv://shitijsharma707:a16qWREKlTYbvLYl@cluster0.qwcrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test';
// Connecting to MongoDB
mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to the database');
})
.catch((error) => {
    console.error('Error connecting to the database:', error);
});
app.use('/api',userRouters)
app.use('/api',leadRouters)
app.put('/api/lead/:id', async (req, res) => {
  const { id } = req.params;
  const { status, action } = req.body;  // Include action to handle 'cancel' or 'accept'

  try {
    let updateData = { status };
    if (action === 'cancel') {
      updateData = { ...updateData, canceled: true };  // Set canceled flag if action is cancel
    }

    const lead = await Customer.findByIdAndUpdate(id, updateData, { new: true });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead status updated successfully!', data: lead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating lead status' });
  }
});
// Routes
app.get('/', (req, res) => {
  res.send('Backend is working And Hello Api working!');
});
// Use process.env.PORT for deployment environments
const PORT = process.env.PORT || 7000;  // Default to 5000 if no port is specified
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
