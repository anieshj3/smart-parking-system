const express = require('express');
const router = express.Router();
const { getSlots, createSlot } = require('../controllers/slotController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getSlots);
router.post('/', protect, createSlot);

module.exports = router;