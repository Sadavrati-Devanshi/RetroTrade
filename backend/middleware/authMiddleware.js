import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Extract JWT from cookies

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Modify this to match your login controller's token structure
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY"); // Use the same secret you used in login
    
    // Change from decoded.userId to decoded.id to match your login controller
    req.user = await User.findById(decoded.id).select("-password");
    
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};