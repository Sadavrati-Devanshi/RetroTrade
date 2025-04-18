export const initialRegisterData = {
    email: "",
    password: "",
    fullName: "",
    city: "",
    role: "",
    profileImage: null,
    upiId: "",
    contact: "",
    err: "",
  };
  
  export const validateRegister = (formData) => {
    if (!formData.email.includes("@")) return "Invalid email format";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    if (formData.contact.length != 10 ) return "Password must be at least 6 characters";
    if (!formData.fullName) return "Full Name is required";
    if (!formData.city) return "City is required";
    if (!formData.role) return "Please select a role";

    return true;
  };
  