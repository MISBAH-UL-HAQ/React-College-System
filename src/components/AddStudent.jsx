import React, { useState } from "react";

const AddStudent = ({ onStudentAdded }) => {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const handleAddStudent = async () => {
    if (!name.trim() || !departmentId.trim()) {
      alert("Please enter student name and department ID");
      return;
    }

    const newStudent = { name, departmentId: parseInt(departmentId) };

    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        const studentData = await response.json();
        if (onStudentAdded) {
          onStudentAdded(studentData); // Call the function to update state
        }
        setName("");
        setDepartmentId("");
      } else {
        console.error("Failed to add student");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div>
      <h3>Add Student</h3>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Department ID"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
      />
      <button onClick={handleAddStudent}>Add Student</button>
    </div>
  );
};

export default AddStudent;
