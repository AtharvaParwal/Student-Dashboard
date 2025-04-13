import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AverageAge.css";

const AverageAge = () => {
  const [averageAge, setAverageAge] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BACKEND_URL;
        const token = localStorage.getItem("token");

        const res = await axios.get(`${BASE_URL}/api/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const students = res.data;

        if (students.length > 0) {
          const totalAge = students.reduce((sum, student) => sum + student.age, 0);
          const avg = totalAge / students.length;
          setAverageAge(avg.toFixed(2));
        }
      } catch (err) {
        console.error("Error fetching average age:", err);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="average-age-box">
      <h3>Average Age of Students</h3>
      {averageAge !== null ? (
        <p>The average age is <strong>{averageAge}</strong> years.</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AverageAge;
