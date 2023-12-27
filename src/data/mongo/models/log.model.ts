import mongoose from "mongoose";

/**
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
*/

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  message: {
    type: String,
    requied: true,
  },
  origin: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const LogModel = mongoose.model("Log", logSchema);
