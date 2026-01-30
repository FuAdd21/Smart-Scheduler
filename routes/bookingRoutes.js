import express from "express";
import protect from "../middleware/authMiddleware.js";
import bookSchedule  from "../controllers/scheduleController.js";
import getMyBookings from "../controllers/bookingController.js";


const router = express.Router();

router.put('/:id/book', protect, bookSchedule)
router.get('/my', protect, getMyBookings);

export default router