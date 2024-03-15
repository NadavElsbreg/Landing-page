// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ndvlsb');


// Mongoose Schema
const userSchema = new mongoose.Schema({
  UserName: String,
  password: String,
  Name: String,
});

const User = mongoose.model('User', userSchema);

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username exists in the database
    const user = await User.findOne({ UserName: username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if password is correct
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Successful login
    return res.json({ user });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
