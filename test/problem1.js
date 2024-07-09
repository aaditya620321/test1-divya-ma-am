// Import the express module
const express = require('express');

// Create a new router object
const router = express.Router();

// Assume you have a Product model imported from your models directory
const Product = require('../models/Product');

// Define a GET route to fetch products with a price greater than a specified minimum price
router.get('/products/:minPrice', async (req, res) => {
    // Extract the minPrice parameter from the request
    const minPrice = req.params.minPrice;

    try {
        // Find products with a price greater than minPrice and sort them in descending order by price
        const products = await Product.find({ price: { $gt: minPrice } }).sort({ price: -1 });

        // Send the products as a JSON response
        res.json(products);
    } catch (err) {
        // If there's an error, send a 500 status code and the error message as a JSON response
        res.status(500).json({ message: err.message });
    }
});

// Export the router object to be used in other parts of the application
module.exports = router;

