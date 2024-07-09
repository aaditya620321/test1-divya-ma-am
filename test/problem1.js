const express = require('express');
const router = express.Router();

//Now here we are Assuming you have a Product model

const Product = require('../models/Product'); 

router.get('/products/:minPrice', async (req, res) => {
    const minPrice = req.params.minPrice;
    try {
        const products = await Product.find({ price: { $gt: minPrice } }).sort({ price: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

