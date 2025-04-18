import express from "express";
import { toggleWishlistItem, getUserWishlist } from "../../controllers/wishlistController.js";
import { protect } from "../../middleware/authMiddleware.js"; // Make sure path is correct

const router = express.Router();

// Debug middleware to help troubleshoot authentication issues
const authDebugMiddleware = (req, res, next) => {
  console.log("Auth Debug - User object:", req.user);
  console.log("Auth Debug - Headers:", req.headers);
  console.log("Auth Debug - Cookies:", req.cookies);
  if (!req.user) {
    console.log("Auth Debug - No user found in request");
  } else {
    console.log("Auth Debug - User ID:", req.user._id);
  }
  next();
};

// ✅ Test route (public)
router.get("/test", (req, res) => {
  res.json({ message: "Wishlist routes working!" });
});

// Add auth test route to verify authentication
router.get("/auth-test", protect, (req, res) => {
  res.json({ 
    success: true, 
    message: "Authentication working", 
    user: { 
      id: req.user._id, 
      email: req.user.email 
    } 
  });
});

// Protected routes - apply both debug middleware and protection
router.post("/toggle", protect, authDebugMiddleware, toggleWishlistItem);
router.get("/my", protect, authDebugMiddleware, getUserWishlist);

export default router;
