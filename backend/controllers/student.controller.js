import axios from "axios";
import { Student } from "../models/Student.js";

const MOCK_API_URL = "https://67ebf57baa794fb3222c4652.mockapi.io/eraah/students";

export const fetchAndStoreStudents = async (req, res) => {
  try {
    const response = await axios.get(MOCK_API_URL);
    const students = response.data;

    for (const student of students) {
      await Student.findOneAndUpdate(
        { name: student.name }, 
        {
          name: student.name,
          age: student.age,
          course: student.Course,
          active: student.active,
          last_updated: new Date(),
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: "Students fetched and stored successfully." });
  } catch (error) {
    console.error("Error fetching/storing students:", error);
    res.status(500).json({ message: "Failed to fetch/store students." });
  }
};

export const getProcessedStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ name: 1 }); 
    res.status(200).json(students);
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).json({ message: "Failed to get students." });
  }
};
