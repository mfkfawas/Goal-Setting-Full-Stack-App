const express = require('express');
const goalController = require('../controllers/goalControllers');

const router = express.Router();

router
  .route('/')
  .get(goalController.getGoals)
  .post(goalController.createGoal);

router
  .route('/:id')
  .put(goalController.updateGoal)
  .delete(goalController.deleteGoal);

module.exports = router;
