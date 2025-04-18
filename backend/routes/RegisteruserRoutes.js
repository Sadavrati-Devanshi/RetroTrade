

import express from "express";
import { getAllUsers, getSingleUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protect, getAllUsers);
router.get("/:userId", protect, getSingleUser);
export default router;