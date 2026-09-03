const express = require('express');
const router = express.Router();
const { getSlots, createSlot } = require('../controllers/slotController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, getSlots);
router.post('/', protect, isAdmin, createSlot);
module.exports = router;