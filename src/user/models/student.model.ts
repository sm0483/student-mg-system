import mongoose from "mongoose";
import IStudent from "../interface/IStudent";

const studentSchema = new mongoose.Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const StudentModel = mongoose.model<IStudent>("Student", studentSchema);
export default StudentModel;
