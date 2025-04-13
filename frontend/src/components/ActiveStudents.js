import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ActiveStudents.css";

const ActiveStudentsPage = () => {
  const [activeStudents, setActiveStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const BASE_URL = process.env.REACT_APP_BACKEND_URL;

        const res = await axios.get(`${BASE_URL}/api/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const filtered = res.data.filter((student) => student.active === true);
        setActiveStudents(filtered);
      } catch (err) {
        console.error("Error fetching active students:", err);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="active-students-container">
      <h2>Active Students</h2>
      {activeStudents.length === 0 ? (
        <p>No active students found.</p>
      ) : (
        <table className="active-students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {activeStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActiveStudentsPage;
