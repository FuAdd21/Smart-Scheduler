import express from "express";
import { ownerOnly } from "../middleware/authMiddleware.js";
import protect from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get('/owner-dashboard', protect, ownerOnly);
// export default router;

const router = express.Router();

router.get("/owner-dashboard", protect, ownerOnly, (req, res) => {
  res.json({ message: "Welcome owner" });
});
export default router;