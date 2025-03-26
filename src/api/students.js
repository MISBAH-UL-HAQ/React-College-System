const API_BASE_URL = "https://localhost:7220/api"; 

// Get all students
export const getStudents = async () => {
  const response = await fetch(`${API_BASE_URL}/students`);
  if (!response.ok) {
    throw new Error("Error fetching students");
  }
  return response.json();
};

// Get a single student by ID
export const getStudentById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching student");
  }
  return response.json();
};

// Add a new student
export const addStudent = async (student) => {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error("Error adding student");
  }
  return response.json();
};

// Update an existing student
export const updateStudent = async (id, student) => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error("Error updating student");
  }
  return response.json();
};

// Delete a student
export const deleteStudent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting student");
  }
  return response;
};
