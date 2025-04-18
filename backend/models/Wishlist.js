import mongoose from "mongoose";

// Make sure this matches what your controller expects
const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
}, { timestamps: true });

// This ensures we can't have duplicate wishlist entries for the same user+product
wishlistSchema.index({ user: 1, product: 1 }, { unique: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;