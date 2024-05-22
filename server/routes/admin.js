const express = require('express');
const router = express.Router();
// Import the controller function
const adminController = require('../controllers/admin')

// Define the route and specify the controller function
router.post('/auth', adminController.login);

module.exports = router;
