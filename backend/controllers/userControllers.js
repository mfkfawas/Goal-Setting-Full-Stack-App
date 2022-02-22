const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Sign JWT
const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() +
  //       process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };

  // if (process.env.NODE_ENV === 'production')
  //   cookieOptions.secure = true;

  // res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// @desc   SignUp new user
//@route   POST /api/users
//access   Public
exports.signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) createAndSendToken(user, 201, res);
  else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc   Authenticate(login) user
//@route   POST /api/users/login
//access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new Error('Please Enter Email and Password');

  const user = await User.findOne({ email });

  if (!user && !(await bcrypt.compare(password, user.password)))
    throw new Error('Email or Password is incorrect.');

  createAndSendToken(user, 200, res);
});

// @desc   Get user data
//@route   POST /api/users/me
//access   Private
exports.getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
});
