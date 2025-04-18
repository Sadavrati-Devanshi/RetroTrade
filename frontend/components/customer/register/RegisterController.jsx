import { useState } from "react";
import RegisterUI from "./RegisterUI";
import { initialRegisterData, validateRegister } from "./RegisterValid";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom"; // ✅ Correct navigation import
import { toast } from "sonner"
import axios from "axios";


const RegisterController = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialRegisterData);
  const [activeTab, setActiveTab] = useState("account");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, err: "" }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value, err: "" }));
  };
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({ 
        ...prev, 
        profileImageFile: file,               // Store the actual file object
        profileImage: URL.createObjectURL(file), // Keep URL for display
        err: "" 
      }));
    } else {
      console.error("No file selected.");
    }
  };
  // const handleImageUpload = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     setFormData((prev) => ({ ...prev, profileImage: URL.createObjectURL(file), err: "" }));
  //   } else {
  //     console.error("No file selected.");
  //   }
  // };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("handleSubmit called!");

  //   const finalData = { ...formData };

  //   // ✅ Validate before dispatching
  //   const validation = validateRegister(finalData);
  //   if (validation !== true) {
  //     console.log("Validation Error:", validation);
  //     toast.error("Validation Error", {
  //       description: validation,
  //       duration: 1300,
  //       style: {
  //         background: "rgba(255, 0, 0, 1)", // Semi-transparent red
  //         // backdropFilter: "blur(10px)", // Glassy effect
  //         border: "1px solid rgba(10, 100, 80, 0.5)", // Red border
  //         color: "white",
  //       },
  //     });
  //     setFormData((prev) => ({ ...prev, err: validation }));
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const result = await dispatch(registerUser(finalData)).unwrap();
  //     toast(" Registration Successfull");
  //     console.log("Registration Success:", result);

  //     // ✅ Navigate after successful registration
  //     setTimeout(() => {
  //       console.log("Navigating to login...",finalData);
  //       navigate("/auth/login"); // ✅ Correctly uses useNavigate()
  //     }, 1000);
  //   } catch (error) {
  //     console.error("❌ Registration Failed:", error);
  //     setFormData((prev) => ({
  //       ...prev,
  //       err: error.response?.data?.error || "Registration failed",
  //     }));
  //   }

  //   setLoading(false);
  // };
// Modified handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("handleSubmit called!");

  // Create a copy of form data
  const finalData = { ...formData };
  
  // Validate before proceeding
  const validation = validateRegister(finalData);
  if (validation !== true) {
    console.log("Validation Error:", validation);
    toast.error("Validation Error", {
      description: validation,
      duration: 1300,
      style: {
        background: "rgba(255, 0, 0, 1)",
        border: "1px solid rgba(10, 100, 80, 0.5)",
        color: "white",
      },
    });
    setFormData((prev) => ({ ...prev, err: validation }));
    return;
  }

  setLoading(true);

  try {
    // STEP 1: Upload image to Cloudinary if an image exists
    if (formData.profileImageFile) {
      // Create FormData for image upload
      const imageFormData = new FormData();
      imageFormData.append('file', formData.profileImageFile);
      
      // Log what's being uploaded for debugging
      console.log("Uploading file:", formData.profileImageFile.name, formData.profileImageFile.type);
      
      // Upload image and get URL
      const imageUploadResponse = await axios.post(
        "http://localhost:5000/api/auth/profile-image", 
        imageFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      
      // Check if upload was successful
      if (imageUploadResponse.data.success) {
        // Replace the image blob URL with the Cloudinary URL for final submission
        finalData.profileImage = imageUploadResponse.data.url;
        console.log("Image uploaded successfully:", finalData.profileImage);
      } else {
        throw new Error("Failed to upload profile image");
      }
    }

    // STEP 2: Register user with the Cloudinary image URL
    const result = await dispatch(registerUser(finalData)).unwrap();
    toast("Registration Successful");
    console.log("Registration Success:", result);

    // Navigate after successful registration
    setTimeout(() => {
      console.log("Navigating to login...", finalData);
      navigate("/auth/login");
    }, 1000);
  } catch (error) {
    console.error("❌ Registration Failed:", error);
    toast.error("Registration Failed", {
      description: error.message || "Unknown error occurred",
      duration: 1300,
    });
    setFormData((prev) => ({
      ...prev,
      err: error.response?.data?.error || "Registration failed",
    }));
  } finally {
    setLoading(false);
  }
};
  return (
    <RegisterUI
      formData={formData}
      handleChange={handleChange}
      handleRoleChange={handleRoleChange}
      handleSubmit={handleSubmit}
      handleImageUpload={handleImageUpload}
      loading={loading}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
};

export default RegisterController;
