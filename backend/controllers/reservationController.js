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

const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id })
      .populate('slot', 'slotNumber vehicleType status')
      .sort({ createdAt: -1 });

    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    if (reservation.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this reservation' });
    }

    if (reservation.status === 'Cancelled') {
      return res.status(400).json({ message: 'Reservation is already cancelled' });
    }

    reservation.status = 'Cancelled';
    await reservation.save();

    const slot = await ParkingSlot.findById(reservation.slot);
    if (slot) {
      slot.status = 'AVAILABLE';
      await slot.save();
    }

    res.status(200).json({ message: 'Reservation cancelled successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('user', 'name email')
      .populate('slot', 'slotNumber vehicleType status')
      .sort({ createdAt: -1 });

    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookSlot, getMyReservations, cancelReservation, getAllReservations };