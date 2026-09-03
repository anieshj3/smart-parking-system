const express = require('express');
const router = express.Router();
const { bookSlot } = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/book', protect, bookSlot);

module.exports = router;