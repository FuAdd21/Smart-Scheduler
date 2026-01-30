import express from "express"
import { getUserProfile, getMyProfile, updateMyProfile } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.get('/', protect, getUserProfile);
router.get("/me", protect, getMyProfile);
router.put('/my', protect, updateMyProfile);

export default router