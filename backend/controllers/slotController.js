const ParkingSlot = require('../models/ParkingSlot');

const getSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find();
    res.status(200).json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createSlot = async (req, res) => {
  try {
    const { slotNumber, vehicleType } = req.body;

    if (!slotNumber || !vehicleType) {
      return res.status(400).json({ message: 'Please provide slot number and vehicle type' });
    }

    const existingSlot = await ParkingSlot.findOne({ slotNumber });
    if (existingSlot) {
      return res.status(400).json({ message: 'Slot already exists' });
    }

    const slot = await ParkingSlot.create({ slotNumber, vehicleType });
    res.status(201).json(slot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getSlots, createSlot };