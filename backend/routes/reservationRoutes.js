const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { bookSlot, getMyReservations, cancelReservation } = require('../controllers/reservationController');

router.post('/book', protect, bookSlot);
router.get('/my', protect, getMyReservations);
router.put('/:id/cancel', protect, cancelReservation);
module.exports = router;