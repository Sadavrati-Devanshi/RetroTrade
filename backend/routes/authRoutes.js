import express from "express";
import {  registerUser,loginUser,logoutUser, authMiddleware } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {  uploadProfileImage } from "../helpers/cloudinary.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post('/profile-image', upload.single('file'), uploadProfileImage);
// router.get("/check-auth", authMiddleware, (req, res) => {
//   const user = req.user;
//   res.status(200).json({
//     success: true,
//     message: "Authenticated user!",
//     user,
//   });
// });
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  console.log(user," Heloooo")
  if (user) {
    return res.status(200).json({ success: true, user });
  } else {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

// router.get("/check-auth", authMiddleware, (req, res) => {
//   if (!req.user) {
//     console.log("User not authenticated");
//     return res.status(401).json({ 
//       success: false, 
//       message: "Not authenticated" 
//     });
//   }
  
//   console.log("User authenticated:", req.user);
//   return res.status(200).json({ 
//     success: true, 
//     user: req.user 
//   });
// });

export default router;