const express = require('express');
const router = express.Router();
const { customer, leadDelte, allLeads, leadId } = require('../Controllers/leadControllers'); // Ensure leadId is used here

// POST route to create a customer
router.post('/customer', customer);

// DELETE route to delete a customer by ID
router.delete('/customer/:id', leadDelte);

// GET route to fetch all leads
router.get('/lead', allLeads);

// GET route to fetch a lead by ID
router.get('/lead/:id', leadId);  // This should match the exported function name

module.exports = router;
