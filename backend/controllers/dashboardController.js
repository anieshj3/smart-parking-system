const ParkingSlot = require('../models/ParkingSlot');
const Reservation = require('../models/Reservation');

const getDashboardStats = async (req, res) => {
  try {
    const totalSlots = await ParkingSlot.countDocuments();
    const availableSlots = await ParkingSlot.countDocuments({ status: 'AVAILABLE' });
    const occupiedSlots = await ParkingSlot.countDocuments({ status: 'OCCUPIED' });
    const totalReservations = await Reservation.countDocuments();
    const activeReservations = await Reservation.countDocuments({ status: 'Active' });

    res.status(200).json({
      totalSlots,
      availableSlots,
      occupiedSlots,
      totalReservations,
      activeReservations
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDashboardStats };