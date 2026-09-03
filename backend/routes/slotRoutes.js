const express = require('express');
const router = express.Router();
const { getSlots, createSlot, updateSlot, deleteSlot } = require('../controllers/slotController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, getSlots);
router.post('/', protect, isAdmin, createSlot);
router.put('/:id', protect, isAdmin, updateSlot);
router.delete('/:id', protect, isAdmin, deleteSlot);
module.exports = router;