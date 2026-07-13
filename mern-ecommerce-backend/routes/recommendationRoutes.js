const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Interaction = require('../models/Interaction');
const { getRecommendations } = require('../utils/recommendationEngine');

// 1. SEED ROUTE: Changed to GET for easy browser testing
router.get('/seed', async (req, res) => {
  try {
    await Product.deleteMany({}); // Clears old entries
    const sampleData = [
      { name: "Pro Wireless Gaming Mouse", description: "RGB mouse with extreme precision", category: "Electronics", tags: ["wireless", "gaming", "mouse", "rgb"], price: 79.99 },
      { name: "Ergonomic Office Mouse", description: "Comfortable mouse for productive hours", category: "Electronics", tags: ["wireless", "office", "mouse", "ergonomic"], price: 49.99 },
      { name: "Mechanical Gaming Keyboard", description: "Blue switch clicky keyboard", category: "Electronics", tags: ["wired", "gaming", "keyboard", "rgb"], price: 99.99 },
      { name: "Noise Canceling Headphones", description: "Over-ear rich bass audio gear", category: "Electronics", tags: ["wireless", "audio", "headphones", "noise-canceling"], price: 199.99 },
      { name: "Wireless Earbuds", description: "Compact smart touch earphones", category: "Electronics", tags: ["wireless", "audio", "earbuds"], price: 59.99 }
    ];
    const inserted = await Product.insertMany(sampleData);
    res.json({ message: "Database seeded successfully!", products: inserted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 3. GET RECOMMENDATIONS FOR A SPECIFIC PRODUCT
router.get('/:id/recommendations', async (req, res) => {
  try {
    const currentProduct = await Product.findById(req.params.id);
    if (!currentProduct) return res.status(404).json({ message: 'Product not found' });

    await Interaction.create({ productId: currentProduct._id, action: 'view' });

    const allProducts = await Product.find({}); 
    const recommendations = getRecommendations(currentProduct, allProducts, 3);
    
    res.json(recommendations);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;