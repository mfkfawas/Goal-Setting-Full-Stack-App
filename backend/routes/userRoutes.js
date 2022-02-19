const express = require('express');
const userController = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(userController.signUp);
router.route('/login').post(userController.login);
router.route('/me').get(authMiddleware.protect, userController.getMe);

module.exports = router;
