import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

//   res.cookie("jwt", token, {
//     httpOnly: true,
//     secure: false, 
//     sameSite: "Lax",
//     maxAge: 7 * 24 * 60 * 60 * 1000, 
//   });
// };

// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await User.create({ name, email, password });

//     generateToken(res, user._id);
//     res.status(201).json({ id: user._id, name: user.name, email: user.email });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ message: "Error registering user", error: error.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     generateToken(res, user._id);
//     res.json({ id: user._id, name: user.name, email: user.email });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// };

// export const logout = (req, res) => {
//   res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
//   res.json({ message: "Logged out successfully" });
// };



//register
// import User from "../models/User.js";
// import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { email, password, fullName, city, role, profileImage, upiId, contact } = req.body;

    // ✅ Debug: Log received data
    console.log("Incoming Registration Data:", req.body);

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "Email already exists. Please use a different email." });
    }

    // ✅ Validate required fields
    if (!email || !password || !fullName || !city || !role) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    // ✅ Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      city,
      role,
      profileImage,
      upiId,
      contact,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password} = req.body;
    const checkUser = await User.findOne({ email });
    const checkPasswordMatch = await bcrypt.compare(password,checkUser.password);

    if (!checkUser) {
      return res.status(400).json({ success: false, error: "Email does not exists. Please Register First." });
    }
    
    if (!checkPasswordMatch) {
      return res.status(400).json({ success: false, error: "Password Incorrect! Please try again." });
    }
    // res.cookie("token", token, {httpOnly : true, secure : false,maxAge: 60 * 60 * 1000,}).json({success : true, message : 'Loggen in Successfully!', user : {email : checkUser, role :checkUser.role, id : checkUser._id}});

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        contact: checkUser.contact,
      },
      "CLIENT_SECRET_KEY", // This should be an environment variable
      { expiresIn: "60m" }
    );

  res.cookie('token', token, { httpOnly: true, secure : false, maxAge: 24 * 60 * 60 * 1000,  path: '/'}).json({success : true, message : 'Loggen in Successfully!', user : {email : checkUser.email, role :checkUser.role, id : checkUser._id, contact :checkUser.contact}});

  }
  catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
}

export const logoutUser = async (req, res) => {
  res.clearCookie('token').json({success:true, message:'Logged out successfully!'})
}

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("token not found", token);
  if (!token) {
    req.user = null; // ✅ Let frontend handle unauthenticated state
    return next();
  
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    return next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    req.user = null; // ✅ Don't fail; just pass control to frontend
    return  next();
  }
};


// export const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     // ✅ Don't return 401; just pass as unauthenticated
//     req.user = null;
//     return next(); // ✅ Let frontend handle this smoothly
//   }

//   try {
//     const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error);
//     req.user = null;
//     next(); // ✅ Let frontend handle it instead of throwing an error
//   }
// };

