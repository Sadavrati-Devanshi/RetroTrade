import { useState } from "react";
import LoginUI from "./LoginUI";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { loginUser } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LoginController = () => {
    const initialState = {
      email: "",
      password: "",
    }
    const navigate = useNavigate(); // ✅ Initialize navigate

     const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value, err: "" }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Login called!");
  
      const finalData = { ...formData };
      setLoading(true);
  
             dispatch(loginUser(finalData)).then((result) => {
         console.log(result)
         if (result.payload?.success) {
          
          toast.success(`Successfully Logged In`, {
            duration: 1500,
            style: {
              background: "rgba(0, 128, 0, 0.9)", // Green for success
              border: "1px solid rgba(0, 128, 0, 0.7)",
              color: "#fff",
              fontWeight: "bold",
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            },
            icon: '✅',
            className: "animate-bounce", // Bounce effect on success
          });
          navigate("/shop/dashboard");
        } else {
          toast.error( result.payload, {
            duration: 1500,
            style: {
              background: "rgba(255, 0, 0, 0.9)", // Red for error
              border: "1px solid rgba(255, 0, 0, 0.7)",
              color: "#fff",
              fontWeight: "bold",
              transform: "translateX(0px)",
              transition: "all 0.3s ease",
            },
            icon: '❌',
            className: "animate-shake", // Shake effect on error
          });
        }
        
        }).catch((err) => {
          console.log(err)
        });
        
  
      setLoading(false);
    };
  
    return (
      <LoginUI
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    );
  };
  
  export default LoginController;