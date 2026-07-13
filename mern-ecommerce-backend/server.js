const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Smart In-Memory Database Initialization
async function connectDatabase() {
  try {
    // Spins up a local, isolated MongoDB instance in your RAM
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    console.log('🍃 Local In-Memory MongoDB Connected Successfully (ISP Block Bypassed!)');
  } catch (err) {
    console.error('❌ Database Connection Error:', err);
  }
}

connectDatabase();

// Routes Configuration
app.use('/api/products', require('./routes/recommendationRoutes'));

app.get('/', (req, res) => {
  res.send('MERN E-commerce Recommendation API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server spinning on port ${PORT}`));