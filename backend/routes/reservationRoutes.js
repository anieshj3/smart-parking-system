const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { bookSlot, getMyReservations } = require('../controllers/reservationController');

router.post('/book', protect, bookSlot);
router.get('/my', protect, getMyReservations);
module.exports = router;