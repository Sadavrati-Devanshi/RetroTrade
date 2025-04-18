import express from "express";
import { createOrder,  getAllPayments, getPaymentDetails, getUserPayments, verifyPayment } from "../controllers/razorpayController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.post("/verify-payment", protect, verifyPayment);
router.get("/details/:paymentId", protect, getPaymentDetails);
router.get("/user-payments", protect, getUserPayments);
// router.get("/all-orders", protect, getAllOrders);
router.get("/all-payments", protect, getAllPayments);
export default router;