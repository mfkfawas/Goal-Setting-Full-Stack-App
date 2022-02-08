const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

// @desc   Get Goals
//@route   GET /api/goals
//access   Private
exports.getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find();

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
  const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!goal) {
    res.status(400);
    throw new Error('Goal Not Found');
  }

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
  const goal = await Goal.findByIdAndDelete(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('That Goal already not Exists.');
  }

  res.status(204).json({
    status: 'success',
    data: 'null',
  });
});
