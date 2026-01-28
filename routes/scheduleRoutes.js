import express from "express";
import { createSchedule } from "../controllers/scheduleController.js";
import { ownerOnly } from "../middleware/authMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, ownerOnly, createSchedule);

export default router