import express from "express";
import protect from "../middleware/authMiddleware.js";
import { bookSchedule } from "../controllers/scheduleController.js";


const router = express.Router();

router.put('/:id/book', protect, bookSchedule)
export default router