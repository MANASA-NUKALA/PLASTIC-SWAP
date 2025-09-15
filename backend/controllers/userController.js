// backend/controllers/userController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config');

const genToken = (user) => jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });

exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const user = new User({ name, email, password, avatar });
    await user.save();

    res.json({
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
      token: genToken(user)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
      token: genToken(user)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.me = async (req, res) => {
  // auth middleware attaches req.user
  res.json(req.user);
};
