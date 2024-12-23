require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const fingerprintRoutes = require('./Routes/fingerprintRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/fingerprint', fingerprintRoutes);

app.get('/api', (req, res) => {
    res.status(200).json({
      message: 'API is working!',
    });
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
