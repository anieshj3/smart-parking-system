const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, isAdmin, getAllUsers);

module.exports = router;