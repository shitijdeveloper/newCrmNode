const User=require('../Models/User');
const bycypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const jwtKey = process.env.JWT_SECRET || "shitij4578";
// Create a new user
const Register = async (req, res) => {
  try {
    const { name, email, mobileno, password, role = "user" } = req.body;
    if (!name || !email || !mobileno || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!password || password.trim() === "") {
      return res.status(400).json({ message: "Password is required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bycypt.hash(password.trim(), 10);
    const newUser = new User({
      name: name.trim(),
      email: email.trim(),
      mobileno: mobileno.trim(),
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: { name, email } });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Server error during registration, please try again." });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await bycypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const jwtKey = process.env.JWT_SECRET || "default_secret_key"; // Fallback for development
    console.log("JWT Key:", jwtKey); // Debugging purpose
    if (!jwtKey) {
      throw new Error("JWT key is not defined");
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, jwtKey, { expiresIn: "3h" });
    const { password: _, ...userWithoutPassword } = user._doc || user;
    res.status(200).json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    console.error("Error in login:", error.message, error.stack);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
const getSearchResults = async (req, res) => {
  const { query } = req.query;
  if (!query) {
      return res.status(400).json({ message: "Search query is required" });
  }
  try {
      const results = await User.find({
          $or: [
              { name: { $regex: query, $options: "i" } },
              { email: { $regex: query, $options: "i" } }
          ]
      });
      res.status(200).json({ data: results });
  } catch (error) {
      console.error(error.stack);
      res.status(500).json({ message: "Failed to perform search", error: error.message });
  }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);  // Log any server errors
      res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
     getSearchResults,
     Register,
     login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
