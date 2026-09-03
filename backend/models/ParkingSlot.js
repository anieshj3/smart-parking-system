const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema({
  slotNumber: {
    type: String,
    required: true,
    unique: true
  },
  vehicleType: {
    type: String,
    enum: ['Car', 'Bike', 'Truck'],
    required: true
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'OCCUPIED'],
    default: 'AVAILABLE'
  }
}, { timestamps: true });

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);