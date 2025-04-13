import React from "react";
import "../styles/StudentTable.css";

const StudentTable = ({ students }) => {
  if (!students || students.length === 0) {
    return <div>No students to show yet...</div>;
  }

  return (
    <div className="student-table-container">
      <h3>All Students</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id || index}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
              <td>{student.active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
