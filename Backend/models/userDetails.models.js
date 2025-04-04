import mongoose from "mongoose";

const userDetails = new mongoose.Schema({
  userName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true }, // ✅ Make email unique
  address: { type: String, required: true },
  education: {
    type: String,
    enum: ["Masters", "Graduate", "Bachelors"],
    required: true,
  },
  masterDegree: { type: String },
  masterYear: { type: Number },
  graduationDegree: { type: String },
  graduationYear: { type: Number },
  class12: { type: Number, required: true },
  class10: { type: Number, required: true },
  technicalSkill: { type: [String], required: true },
  certification: [
    {
      name: { type: String, required: true },
      language: { type: String, required: true },
      date: { type: Date, required: true },
    },
  ],
  experience: { type: Number, required: true, min: 0 },
  achievement: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
});

export const Details = mongoose.model("Details", userDetails);
