import express from "express";
import { createSchedule, getAvailableSchedule } from "../controllers/scheduleController.js";
import { ownerOnly } from "../middleware/authMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import { getOwnerBookedSchedule, cancelBooked, updateSchedule, delateSchedule, notification, getSchedules, getClients } from "../controllers/scheduleController.js";


const router = express.Router();
router.post("/", protect, createSchedule);
router.get("/", getAvailableSchedule);
router.get("/owner/booked", protect, ownerOnly, getOwnerBookedSchedule);
router.get("/owner/clients", protect, ownerOnly, getClients);
router.put("/:id/cancel", protect, cancelBooked);
router.put("/:id/update", protect, ownerOnly, updateSchedule );
router.delete("/:id/delate", protect, ownerOnly, delateSchedule);
router.get("/notification", protect, notification);
router.get("/get", getSchedules);




export default router