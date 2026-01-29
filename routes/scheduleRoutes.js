import express from "express";
import { createSchedule, getAvailableSchedule } from "../controllers/scheduleController.js";
import { ownerOnly } from "../middleware/authMiddleware.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();
router.post("/", protect, ownerOnly, createSchedule);
router.get("/", getAvailableSchedule)

export default router