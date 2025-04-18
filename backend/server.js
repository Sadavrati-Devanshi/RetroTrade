import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import allUser from "./routes/RegisteruserRoutes.js"
import productRoutes from "./routes/Seller/productRoutes.js";
import wishlistRoutes from "./routes/Buyer/wishlistRoutes.js";
import paymentRoutes from "./routes/razorpayRoutes.js"
import Razorpay from "razorpay";
dotenv.config();
// connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "RetroTrade"
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(cors({
  origin: "http://localhost:5173",  // ✅ Ensure this matches frontend
  credentials: true,                
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", authRoutes);
app.use('/api/seller/products', productRoutes)
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/users", allUser);
app.use("/api/payment", paymentRoutes); 


app.listen(PORT, () => console.log(`Server running on port ${PORT}, ${process.env.MONGO_URI}`));




