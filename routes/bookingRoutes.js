import express from "express";
import protect from "../middleware/authMiddleware.js";
import { bookSchedule } from "../controllers/scheduleController.js";
import getMyBookings from "../controllers/bookingController.js";
import { cancelBooking } from "../controllers/bookingController.js";


const router = express.Router();

router.post('/', protect, bookSchedule);
router.get('/my', protect, getMyBookings);
router.delete("/:id", protect, cancelBooking);

export default router