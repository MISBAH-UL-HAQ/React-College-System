
const API_BASE_URL = "https://localhost:7220/api";


// Get all departments
export const getDepartments = async () => {
  const response = await fetch(`${API_BASE_URL}/departments`);
  if (!response.ok) {
    throw new Error("Error fetching departments");
  }
  return response.json();
};

// Get a single department by id
export const getDepartmentById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/departments/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching department");
  }
  return response.json();
};

// Add a new department
export const addDepartment = async (department) => {
  const response = await fetch(`${API_BASE_URL}/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  });
  if (!response.ok) {
    throw new Error("Error adding department");
  }
  return response.json();
};

// Update an existing department
export const updateDepartment = async (id, department) => {
  const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  });
  if (!response.ok) {
    throw new Error("Error updating department");
  }
  return response.json();
};

// Delete a department
export const deleteDepartment = async (id) => {
  const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting department");
  }
  return response;
};
