// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;









// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import './App.css'; 
// import Header from './components/Header';
// import DepartmentsList from './components/DepartmentsList';
// import AddDepartment from './components/AddDepartment';
// import { getDepartments } from './api'; 

// function App() {
//   const [departments, setDepartments] = useState([]);

//   // Fetch departments on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getDepartments();
//         setDepartments(data);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Callback to add a new department
//   const handleDepartmentAdded = (newDept) => {
//     setDepartments((prev) => [...prev, newDept]);
//   };

//   return (
//     <div className="container mt-4">
//       <Header />
//       <div className="row">
//         {/* Left column: Add a department */}
//         <div className="col-md-4 mb-4">
//           <AddDepartment onDepartmentAdded={handleDepartmentAdded} />
//         </div>

//         {/* Right column: List all departments */}
//         <div className="col-md-8">
//           <DepartmentsList departments={departments} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;




import React from "react";
import Header from "./components/Header";
import DepartmentsList from "./components/DepartmentsList";
import AddDepartment from "./components/AddDepartment";
import StudentsList from "./components/StudentsList";
import AddStudent from "./components/AddStudent";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <Header />
      <h2>Department Management</h2>
      <AddDepartment />
      <DepartmentsList />

      <h2>Student Management</h2>
      <AddStudent />
      <StudentsList />
    </div>
  );
}

export default App;
