import Wishlist from "../models/Wishlist.js";

export const toggleWishlistItem = async (req, res) => {
  try {
    const { productId } = req.body;
    
    // Get userId from req.user (not req.user?.id)
    const userId = req.user ? req.user._id : null;
    
    console.log("Debug - Toggle wishlist request:");
    console.log("- Product ID:", productId);
    console.log("- User ID:", userId);
    console.log("- User object:", req.user);

    if (!userId) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    if (!productId) {
      return res.status(400).json({ success: false, error: "Product ID is required" });
    }

    // Check if schema expects 'product' or 'products'
    const existing = await Wishlist.findOne({ user: userId, product: productId });
    console.log("Debug - Existing wishlist item:", existing);

    if (existing) {
      await Wishlist.findByIdAndDelete(existing._id);
      return res.status(200).json({ 
        success: true, 
        message: "Removed from wishlist",
        data: { _id: productId }
      });
    }

    const wishlistItem = new Wishlist({ user: userId, product: productId });
    const saved = await wishlistItem.save();
    console.log("Debug - Saved wishlist item:", saved);

    res.status(201).json({ 
      success: true, 
      message: "Added to wishlist", 
      data: { _id: productId }
    });
  } catch (error) {
    console.error("Wishlist Error:", error);
    res.status(500).json({ success: false, error: "Server error: " + error.message });
  }
};

export const getUserWishlist = async (req, res) => {
  try {
    // Get userId from req.user (not req.user?.id)
    const userId = req.user ? req.user._id : null;
    
    console.log("Debug - Get wishlist for user:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    const wishlist = await Wishlist.find({ user: userId }).populate("product");
    console.log("Debug - Found wishlist items:", wishlist.length);

    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    res.status(500).json({ success: false, error: "Server error: " + error.message });
  }
};