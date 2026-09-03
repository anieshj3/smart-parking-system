const Reservation = require('../models/Reservation');
const ParkingSlot = require('../models/ParkingSlot');

const bookSlot = async (req, res) => {
  try {
    const { slotId } = req.body;

    if (!slotId) {
      return res.status(400).json({ message: 'Please provide a slot to book' });
    }

    const slot = await ParkingSlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.status === 'OCCUPIED') {
      return res.status(400).json({ message: 'This slot is already booked' });
    }

    const reservation = await Reservation.create({
      user: req.user.id,
      slot: slot._id,
      status: 'Active'
    });

    slot.status = 'OCCUPIED';
    await slot.save();

    res.status(201).json({
      message: 'Slot booked successfully',
      reservation
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookSlot };