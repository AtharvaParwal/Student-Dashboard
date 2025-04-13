import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,
    course: String,
    active: Boolean,
    last_updated: { type: Date, default: Date.now },
  },
  { strict: false } 
);


export const Student = mongoose.model("Student", studentSchema);
