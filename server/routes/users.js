const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { auth } = require('../auth');

router.post('/register', async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res.status(400);

    throw new Error('You must fill all fields');
  }

  //?Checking duplicate
  //! Check if email exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error('Email already exists');
  }
  //? END OF Checking duplicate data

  //! Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //! Create new user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Bir hata oluştu :/');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('You must fill all fields');
  }

  //! Check for user email
  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('E-posta veya şifre hatalı');
  }
});

//! Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

router.post('/me', auth, async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ msg: 'Token is not valid' });
    } else {
      req.user = decoded.user;

      res.json(decoded.user);
    }
  });
});

module.exports = router;
