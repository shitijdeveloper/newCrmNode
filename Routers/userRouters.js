const express = require('express');
const { login, Register, getAllUsers, getUserById, updateUser, deleteUser, getSearchResults } = require('../Controllers/userControllers');
const router = express.Router();

// Create a new user
router.post('/users', Register);

router.post('/login',login)

router.get('/search',getSearchResults)
// Get all users
router.get('/users', getAllUsers);

// Get a user by ID
router.get('/users/:id', getUserById);

// Update a user
router.put('/users/:id', updateUser);

// Delete a user
router.delete('/users/:id', deleteUser);

module.exports = router;