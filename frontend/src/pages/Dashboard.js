import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import StudentTable from "../components/StudentTable.js";
import ActivePieChart from "../components/ActivePieChart.js";
import AverageAge from "../components/AverageAge.js";
import GroupedByCourse from "../components/GroupedByCourse.js";
import ActiveStudentsPage from "../components/ActiveStudents.js";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setIsAuthenticated }) => {
  const [students, setStudents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const tableRef = useRef(null);
  const pieChartRef = useRef(null);
  const activeStudentsRef = useRef(null);
  const averageAgeRef = useRef(null);
  const groupedByCourseRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(res.data);
      } 
      catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error("Error fetching students:", error);
        }
      }
    };

    fetchStudents();
  }, [navigate]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-theme' : ''}`}>
      <h1>Student Dashboard</h1>

      <div className="button-container">
        <button onClick={() => scrollToRef(tableRef)}>Go to Student Table</button>
        <button onClick={() => scrollToRef(pieChartRef)}>Go to Active vs Inactive Chart</button>
        <button onClick={() => scrollToRef(activeStudentsRef)}>Go to Only Active Students</button>
        <button onClick={() => scrollToRef(averageAgeRef)}>Go to Average Age</button>
        <button onClick={() => scrollToRef(groupedByCourseRef)}>Go to Students by Course</button>
        <button onClick={toggleTheme}>
          {darkMode ? 'Light Theme' : 'Dark Theme'}
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to logout?</h3>
            <div className="modal-buttons">
              <button onClick={confirmLogout} className="confirm-button">
                Yes, Logout
              </button>
              <button onClick={cancelLogout} className="cancel-button">
                No, Stay
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="content-section" ref={tableRef}>
        <StudentTable students={students} darkMode={darkMode} />
      </div>

      <div className="content-section" ref={pieChartRef}>
        <ActivePieChart students={students} darkMode={darkMode} />
      </div>

      <div className="content-section" ref={activeStudentsRef}>
        <ActiveStudentsPage students={students} darkMode={darkMode} />
      </div>

      <div className="content-section" ref={averageAgeRef}>
        <AverageAge students={students} darkMode={darkMode} />
      </div>

      <div className="content-section" ref={groupedByCourseRef}>
        <GroupedByCourse students={students} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Dashboard;