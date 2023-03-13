const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const simplecrypt = require('simplecrypt');
const User = require('../models/user');
const { auth } = require('../auth');

var sc = simplecrypt();

router.post('/register', async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // check if the user already exists
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // create new user
    user = new User({
      fullname,
      email,
      password,
    });

    // hash user password

    user.password = await sc.encrypt(password);
    await user.save();

    // return jwt
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Email or password incorrect' });
    }

    // check is the encrypted password matches
    const isMatch = (await sc.decrypt(password)) == user.password;
    if (!isMatch) {
      return res.status(400).json({ msg: 'Email or password incorrect' });
    }

    // return jwt
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '30 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// router.get('/tasks', auth, async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.user.id).select('-password');
//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
