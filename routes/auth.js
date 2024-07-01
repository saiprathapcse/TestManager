const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(username, password, 'login')
    const user = await User.findOne({ username });
    console.log(user)
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ username, role: user.role }, 'secret', { expiresIn: '1h' });
    res.json({ token, userId: user._id, role: user.role});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
