import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent, updateStudent } from "../api/students";

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [editStudentId, setEditStudentId] = useState(null);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    departmentId: "",
  });

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student.id !== id));
    } catch (err) {
      alert("Error deleting student: " + err.message);
    }
  };

  const handleEdit = (student) => {
    setEditStudentId(student.id);
    setEditForm({ id: student.id, name: student.name, departmentId: student.departmentId });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(editForm);
      const updatedStudents = students.map((student) =>
        student.id === editStudentId ? { ...student, ...editForm } : student
      );
      setStudents(updatedStudents);
      setEditStudentId(null); // Close the form
    } catch (err) {
      alert("Error updating student: " + err.message);
    }
  };

  return (
    <div className="table-container">
      <h2>Students</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Edit Form */}
      {editStudentId && (
        <div className="edit-form">
          <h3>Edit Student</h3>
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
            <div>
              <label>Department ID:</label>
              <input
                type="text"
                name="departmentId"
                value={editForm.departmentId}
                onChange={handleEditChange}
                required
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditStudentId(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Student Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.departmentId}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
