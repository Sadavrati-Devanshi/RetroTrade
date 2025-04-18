import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
      title: { type: String, required: true },
      description: { type: String },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      originalPrice: { type: Number },
      availabilityDate: { type: Date },
      condition: { type: String },
      location: { type: String },
      imageUrls: [{ type: String, required: true }], // Cloudinary URLs
      deliveryOptions: [{ type: String }],
      reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // Reference for future use
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      status: {
        type: String,
        enum: ['live', 'bought'],
        default: 'live'
      }
    }, { timestamps: true });
    
    const Product = mongoose.model("Product", productSchema);
    
    export default Product;
    