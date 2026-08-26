import React, { useState, useEffect } from "react";
import API from "../api";

function Reservation() {
  const [slots, setSlots] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSlots = async () => {
    try {
      const res = await API.get("/slots");
      setSlots(res.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Unable to load slots");
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await API.get("/reservations");
      setReservations(res.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Unable to load reservations");
    }
  };

  useEffect(() => {
    fetchSlots();
    fetchReservations();
  }, []);

  const bookSlot = async () => {
    if (!selectedSlot) {
      setError("Please select a slot");
      setSuccess("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await API.post("/reservations/book", {
        slotId: selectedSlot,
      });

      setSuccess("Slot booked successfully");
      setSelectedSlot("");

      fetchSlots();
      fetchReservations();
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const releaseSlot = async (id) => {
    try {
      setError("");
      setSuccess("");

      await API.put(`/reservations/release/${id}`);

      setSuccess("Slot released successfully");

      fetchSlots();
      fetchReservations();
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Release failed");
    }
  };

  const availableSlots = slots.filter((slot) => slot.status === "AVAILABLE");

  return (
    <div className="container page-shell">
      <div className="page-header">
        <div>
          <h2>Reservations</h2>
          <p>Book an available parking slot and manage active reservations.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card app-card p-3 shadow-sm mb-4">
        <h4>Book a Slot</h4>

        <select
          className="form-control mb-3"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value="">Select Slot</option>

          {availableSlots.map((slot) => (
            <option key={slot._id} value={slot._id}>
              {slot.slotNumber} - {slot.vehicleType}
            </option>
          ))}
        </select>

        <button
          className="btn btn-primary"
          onClick={bookSlot}
          disabled={!selectedSlot || loading}
        >
          {loading ? "Booking..." : "Book Slot"}
        </button>
      </div>

      <div className="card app-card p-3 shadow-sm">
        <h4>Reservation List</h4>

        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Slot</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reservations.length > 0 ? (
                reservations.map((r) => (
                  <tr key={r._id}>
                    <td>{r.userName || "User"}</td>
                    <td>
                      {r.slotId?.slotNumber ? (
                        r.slotId.slotNumber
                      ) : (
                        <span className="text-warning fw-semibold">Missing slot</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={
                          r.status === "BOOKED"
                            ? "badge bg-success"
                            : "badge bg-secondary"
                        }
                      >
                        {r.status}
                      </span>
                    </td>
                    <td>
                      {r.status === "BOOKED" && r.slotId ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => releaseSlot(r._id)}
                        >
                          Release
                        </button>
                      ) : (
                        <span className="text-muted">Released</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Reservations Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
