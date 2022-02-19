const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc   Get Goals
//@route   GET /api/goals
//access   Private
exports.getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    results: goals.length,
    data: {
      goals,
    },
  });
});

// @desc   Create Goal
//@route   POST /api/goals
//access   Private
exports.createGoal = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a  text field'); //express error handler
  }

  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text,
  });

  res.status(201).json({
    status: 'success',
    data: {
      goal,
    },
  });
});

// @desc   Update Goal
//@route   PUT /api/goals/:id
//access   Private
exports.updateGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal Not Found');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User Not Found');
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User Not Authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      goal,
    },
  });
});

// @desc   Delete Goal
//@route   DELETE /api/goals/:id
//access   Private
exports.deleteGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('That Goal already not Exists.');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User Not Found');
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User Not Authorized');
  }

  await Goal.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: 'null',
  });
});
