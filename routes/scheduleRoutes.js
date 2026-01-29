import express from "express";
import { createSchedule, getAvailableSchedule } from "../controllers/scheduleController.js";
import { ownerOnly } from "../middleware/authMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import { getOwnerBookedSchedule, cancelBooked, updateSchedule, delateSchedule, notification } from "../controllers/scheduleController.js";


const router = express.Router();
router.post("/", protect, ownerOnly, createSchedule);
router.get("/", getAvailableSchedule);
router.get("/owner/booked", protect, ownerOnly, getOwnerBookedSchedule);
router.put("/:id/cancel", protect, cancelBooked);
router.put("/:id/update", protect, ownerOnly, updateSchedule );
router.delete("/:id/delate", protect, ownerOnly, delateSchedule);
router.get("/notification", protect, notification);



export default router