import React, { useState, useEffect } from "react";
import API from "../api";

function Slots() {
  const [slots, setSlots] = useState([]);
  const [slotNumber, setSlotNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchSlots();
  }, []);

  const addSlotHandler = async () => {
    if (!slotNumber.trim()) {
      setError("Please enter slot number");
      return;
    }

    try {
      await API.post("/slots/add", {
        slotNumber,
        vehicleType,
      });

      setSlotNumber("");
      setVehicleType("Car");
      setError("");
      fetchSlots();
    } catch (error) {
      console.log(error);
      setError("Unable to add slot");
    }
  };

  const deleteSlotHandler = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this slot?");

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/slots/${id}`);
      fetchSlots();
    } catch (error) {
      console.log(error);
      setError("Unable to delete slot");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Parking Slots</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow mb-4">
        <div className="card-body">
          <h5 className="card-title">Add New Slot</h5>

          <div className="row">
            <div className="col-md-5 mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Slot Number"
                value={slotNumber}
                onChange={(e) => setSlotNumber(e.target.value)}
              />
            </div>

            <div className="col-md-5 mb-3">
              <select
                className="form-control"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            <div className="col-md-2 mb-3">
              <button className="btn btn-primary w-100" onClick={addSlotHandler}>
                Add Slot
              </button>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Slot Number</th>
            <th>Vehicle Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {slots.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No slots found
              </td>
            </tr>
          ) : (
            slots.map((slot) => (
              <tr key={slot._id}>
                <td>{slot.slotNumber}</td>
                <td>{slot.vehicleType}</td>
                <td>
                  <span
                    className={
                      slot.status === "AVAILABLE"
                        ? "badge bg-success"
                        : "badge bg-danger"
                    }
                  >
                    {slot.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteSlotHandler(slot._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Slots;