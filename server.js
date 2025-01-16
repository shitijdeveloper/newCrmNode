const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app=express()
const userRouters=require('./Routers/userRouters')
const leadRouters=require('./Routers/leadRouter')
const Customer=require('./Models/Lead')
const path=require("path")
const multer=require('multer')
const Lead=require('./Models/Lead')
const User=require('./Models/User')
const comp=require('./Models/Customer')
app.use('/images', cors(), express.static(path.join(__dirname, 'public/images')));
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend to communicate
  methods: 'GET,POST', // Allow only GET and POST methods
}));
app.post('/api/complaint', async (req, res) => {
  try {
    const { name, email, mobileno, complaint } = req.body;
    if (!name || !email || !mobileno || !complaint) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const result = new comp({
      name,
      email,
      mobileno,
      complaint
    });
    await result.save();
    res.status(201).json({ message: "Complaint submitted successfully!", data: result });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ message: "Server Error. Please try again later." });
  }
});
// Backend API (Node.js)
app.get('/api/comp', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination parameters
    const skip = (page - 1) * limit;

    const complaints = await comp.find()
      .skip(skip)
      .limit(parseInt(limit));

    const totalComplaints = await comp.countDocuments();

    res.json({
      complaints,
      totalPages: Math.ceil(totalComplaints / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching complaints" });
  }
});


// MongoDB connection URI
const mongoDBURI = 'mongodb+srv://shitijsharma707:a16qWREKlTYbvLYl@cluster0.qwcrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test';
// Connecting to MongoDB
// const mongoDBURI="mongodb://localhost:27017/CRM"
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
app.get('/api/leadaaa', async (req, res) => {
  const { userId } = req.query;
  console.log('User ID:', userId); // Log received userId
  try {
    // Change this to 'createby' since that is the field you're filtering by
    const leads = await Lead.find({ createby: userId });
    console.log('Leads found:', leads); // Log the result of the query
    res.json(leads);
  } catch (err) {
    console.error('Error fetching leads:', err);
    res.status(500).json({ message: "Error fetching leads" });
  }
});
app.get('/api/leadquery', async (req, res) => {
  const { fromDate, toDate, userType, leadStatus } = req.query;
  try {
    let query = {};
    if (fromDate) query.createdAt = { $gte: new Date(fromDate) };
    if (toDate) query.createdAt = { ...query.createdAt, $lte: new Date(toDate) };
    if (userType) query.userType = userType;
    if (leadStatus) query.status = leadStatus;

    const leads = await Lead.find(query); // Assuming Lead is your model
    res.json({ leads });
  } catch (error) {
    res.status(500).send("Error fetching leads");
  }
});



// Routes
app.get('/', (req, res) => {
  res.send('Backend is working And Hello Api working!');
});
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Save image to public/images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create unique filename
  },
});

const uploadProfileImage = multer({ storage }).single("file");

app.post("/api/upload-profile-image", uploadProfileImage, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Uploaded file:", req.file); // Log the uploaded file to see if it reaches the backend

    const userId = req.body.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImg: req.file.filename }, // Save the filename in the DB
      { new: true }
    );

    res.status(200).json({
      message: "Profile image uploaded successfully!",
      profileImgUrl: `http://localhost:7000/images/${req.file.filename}`, // Send the full URL
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading profile image: " + error.message });
  }
});
// Use process.env.PORT for deployment environments
const PORT = process.env.PORT || 7000;  // Default to 5000 if no port is specified
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
