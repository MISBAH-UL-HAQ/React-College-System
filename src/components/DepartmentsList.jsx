import React, { useEffect, useState } from "react";
import { getDepartments, deleteDepartment, updateDepartment } from "../api";

export default function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
  });

  // Fetch departments on component mount
  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch departments when the component mounts
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handle department deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      await deleteDepartment(id);
      setDepartments(departments.filter((dept) => dept.id !== id));
    } catch (err) {
      alert("Error deleting department: " + err.message);
    }
  };

  // Set the department to edit
  const handleEdit = (department) => {
    setEditDepartmentId(department.id);
    setEditForm({ id: department.id, name: department.name });
  };

  // Handle form input change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission to update department
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDepartment(editForm);
      const updatedDepartments = departments.map((dept) =>
        dept.id === editDepartmentId ? { ...dept, ...editForm } : dept
      );
      setDepartments(updatedDepartments);
      setEditDepartmentId(null); // Close the edit form
    } catch (err) {
      alert("Error updating department: " + err.message);
    }
  };

  return (
    <div className="table-container">
      <h2>Departments</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Edit Department Form */}
      {editDepartmentId && (
        <div className="edit-form">
          <h3>Edit Department</h3>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                required
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditDepartmentId(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Departments Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.name}</td>
              <td>
                <button onClick={() => handleEdit(dept)}>Edit</button>
                <button onClick={() => handleDelete(dept.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
