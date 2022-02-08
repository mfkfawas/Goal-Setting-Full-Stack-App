const asyncHandler = require('express-async-handler');

// @desc   Get Goals
//@route   GET /api/goals
//access   Private
exports.getGoals = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: 'get Goals' });
});

// @desc   Create Goal
//@route   POST /api/goals
//access   Private
exports.createGoal = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a  text field'); //express error handler
  }

  res.status(201).json({ message: 'set Goals' });
});

// @desc   Update Goal
//@route   PUT /api/goals/:id
//access   Private
exports.updateGoal = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: `Update Goal ${req.params.id}`,
  });
});

// @desc   Delete Goal
//@route   DELETE /api/goals/:id
//access   Private
exports.deleteGoal = asyncHandler(async (req, res, next) => {
  res.status(204).json({
    status: 'success',
    data: 'null',
  });
});
