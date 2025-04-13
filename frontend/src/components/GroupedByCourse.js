import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "../styles/GroupedByCourse.css";

const GroupedByCourse = () => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BACKEND_URL;
        const token = localStorage.getItem("token");

        const res = await axios.get(`${BASE_URL}/api/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const students = res.data;

        const grouped = students.reduce((acc, student) => {
          acc[student.course] = (acc[student.course] || 0) + 1;
          return acc;
        }, {});

        const formatted = Object.entries(grouped).map(([course, count]) => ({
          course,
          count,
        }));

        setCourseData(formatted);
      } catch (err) {
        console.error("Error fetching grouped course data:", err);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="grouped-course-container">
      <h3>Students Grouped by Course</h3>
      {courseData.length > 0 ? (
        <div style={{ width: "100%", minHeight: "500px" }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={courseData}
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="course"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="count" fill="#4CAF50" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>

  );
};

export default GroupedByCourse;
