import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
  },
  fullName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["buyer", "seller", "admin"],
    required: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  err: {
    type: String,
    default: "",
  },
  upiId: {
  type: String,
  default: "",
},
contact: {
  type: String,
  required: true,
  match: [/^\d{10}$/, "Contact must be exactly 10 digits"],
},
  state: {
    type: String,
    enum: ["active", "deactivated"],
    default: "active", // <-- This ensures default state
  },
}, { timestamps: true });



// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next(); 
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model("Register", userSchema);
export default User;
