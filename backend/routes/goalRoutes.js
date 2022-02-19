const express = require('express');
const goalController = require('../controllers/goalControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(authMiddleware.protect, goalController.getGoals)
  .post(authMiddleware.protect, goalController.createGoal);

router
  .route('/:id')
  .put(authMiddleware.protect, goalController.updateGoal)
  .delete(authMiddleware.protect, goalController.deleteGoal);

module.exports = router;
