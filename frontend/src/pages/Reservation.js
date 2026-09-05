import React, { useEffect, useState } from "react";
import API from "../api";

function Reservation() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchSlots();
    fetchReservations();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await API.get("/slots");
      setSlots(res.data);
    } catch (error) {
      console.log("Error fetching slots:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await API.get("/reservations/my");
      setReservations(res.data);
    } catch (error) {
      console.log("Error fetching reservations:", error);
    }
  };

  const handleBookSlot = async (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      setMessage("Please select a slot");
      setMessageType("danger");
      return;
    }

    try {
      const res = await API.post("/reservations/book", {
        slotId: selectedSlot,
      });

      setMessage("Slot booked successfully!");
      setMessageType("success");
      setSelectedSlot("");
      fetchReservations();
      fetchSlots();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to book slot");
      setMessageType("danger");
    }
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      await API.put(`/reservations/${reservationId}/cancel`);
      setMessage("Reservation cancelled successfully!");
      setMessageType("success");
      fetchReservations();
      fetchSlots();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to cancel reservation"
      );
      setMessageType("danger");
    }
  };

  return (
    <div className="container page-shell">
      <div className="page-header">
        <div>
          <h2>Reservations</h2>
          <p>Book an available parking slot and manage active reservations.</p>
        </div>
      </div>

      {message && (
        <div className={`alert alert-${messageType}`}>{message}</div>
      )}

      <div className="card app-card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Book a Slot</h5>
          <form onSubmit={handleBookSlot}>
            <div className="mb-3">
              <label className="form-label">Select Slot</label>
              <select
                className="form-control"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="">Select a slot...</option>
                {slots.map((slot) => (
                  <option key={slot._id} value={slot._id}>
                    {slot.slotNumber} - {slot.vehicleType} (
                    {slot.status})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedSlot}
            >
              Book Slot
            </button>
          </form>
        </div>
      </div>

      <div className="card app-card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Reservation List</h5>
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Slot</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Reservations Found
                  </td>
                </tr>
              ) : (
                reservations.map((reservation) => (
                  <tr key={reservation._id}>
                    <td>{reservation.user.name}</td>
                    <td>
                      {reservation.slot.slotNumber} -{" "}
                      {reservation.slot.vehicleType}
                    </td>
                    <td>
                      <span
                        className={`badge badge-${
                          reservation.status === "Active"
                            ? "success"
                            : "secondary"
                        }`}
                      >
                        {reservation.status}
                      </span>
                    </td>
                    <td>
                      {reservation.status === "Active" && (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleCancelReservation(reservation._id)
                          }
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reservation;