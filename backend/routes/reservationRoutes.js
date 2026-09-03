const express = require('express');
const router = express.Router();
const { bookSlot, getMyReservations, cancelReservation, getAllReservations } = require('../controllers/reservationController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/book', protect, bookSlot);
router.get('/my', protect, getMyReservations);
router.get('/all', protect, isAdmin, getAllReservations);
router.put('/:id/cancel', protect, cancelReservation);
module.exports = router;