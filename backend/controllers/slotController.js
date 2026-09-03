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
const updateSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { slotNumber, vehicleType } = req.body;

    const slot = await ParkingSlot.findById(id);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slotNumber) slot.slotNumber = slotNumber;
    if (vehicleType) slot.vehicleType = vehicleType;

    await slot.save();

    res.status(200).json({
      message: 'Slot updated successfully',
      slot
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await ParkingSlot.findById(id);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.status === 'OCCUPIED') {
      return res.status(400).json({ message: 'Cannot delete an occupied slot' });
    }

    await ParkingSlot.findByIdAndDelete(id);

    res.status(200).json({ message: 'Slot deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getSlots, createSlot, updateSlot, deleteSlot };