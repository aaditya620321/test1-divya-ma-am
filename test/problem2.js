// Import required modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

// Route to handle password update
router.post('/update-password', async (req, res) => {
    const { userId, newPassword } = req.body; // Extract userId and newPassword from the request body
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            // If user is not found, send a 404 response
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update the user's password with the hashed password
        user.password = hashedPassword;
        
        // Save the updated user object to the database
        await user.save();
        
        // Send a success response
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        // If there's an error, send a 500 response with the error message
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; // Export the router
