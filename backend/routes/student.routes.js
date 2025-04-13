import express from "express";
import { fetchAndStoreStudents, getProcessedStudents } from "../controllers/student.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/fetch", fetchAndStoreStudents);         
router.get("/", protect, getProcessedStudents);   

export default router;
