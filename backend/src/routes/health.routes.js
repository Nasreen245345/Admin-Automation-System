import { Router } from "express";
import mongoose from "mongoose";
import { sendSuccess } from "../utils/apiResponse.js";

const router = Router();

router.get("/health", (req, res) => {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
  sendSuccess(res, {
    message: "API is healthy",
    data: {
      uptime: process.uptime(),
      database: dbStates[mongoose.connection.readyState],
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
