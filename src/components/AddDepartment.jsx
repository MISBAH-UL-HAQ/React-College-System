import React, { useState } from "react";
import { addDepartment } from "../api";

export default function AddDepartment({ onDepartmentAdded }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDepartment = await addDepartment({ name });
      onDepartmentAdded(newDepartment); // Notify parent to update list
      setName(""); // Clear form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Department</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department Name"
          required
        />
        <button type="submit">Add Department</button>
      </form>
    </div>
  );
}
