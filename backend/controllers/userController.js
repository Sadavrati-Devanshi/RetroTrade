
import User from "../models/User.js";
export const getAllUsers = async (req, res) => {
  try {
   
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    // Get all users (excluding passwords)
    const users = await User.find({}, "-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error while fetching users" });
  }
};
export const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find user by ID and exclude sensitive fields
    const user = await User.findById(userId, "-password -email -err");
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Check if user is deactivated
    if (user.state === "deactivated") {
      return res.status(403).json({ success: false, message: "This user account is deactivated" });
    }
    
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server error while fetching user details" });
  }
};