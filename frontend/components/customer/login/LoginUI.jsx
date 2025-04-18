// LoginUI.jsx
import {motion } from "framer-motion";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../../images/bgimg.jpg";
import { useState } from "react";
useNavigate

const LoginUI = ({ formData, setFormData, handleChange, handleSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#FFF5E1] via-[#F4E1D2] to-[#000000] select-none"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-8 rounded-xl shadow-lg border border-yellow-400 bg-[#f8f1e7]/65"
      >
        {/* Header & Logo */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex justify-center mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-md">
              <ShoppingBag className="text-white" size={28} />
            </div>
          </motion.div>

          <motion.h1 className="text-3xl font-bold text-yellow-800 hover:text-amber-500" onClick={()=>navigate("/home")}>RetroTrade</motion.h1>
          <motion.p className="text-gray-700 mt-2">Sign in to your account</motion.p>
        </div>

        {/* Login Form */}
        <motion.form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Email</label>
            <Input
              type="email"
              name="email"
              value={formData?.email || ""}
              onChange={(e) => {
                console.log("Email input changed:", e.target.value);
                handleChange(e);
              }}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData?.password || ""}
                onChange={(e) => {
                  console.log("Password input changed:", e.target.value);
                  handleChange(e);
                }}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {formData?.err && (
            <p className="text-sm text-red-600 text-center">{formData?.err}</p>
          )}

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-yellow-300 rounded"
                onChange={(e) => {
                  console.log("Remember me checked:", e.target.checked);
                }}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div> */}
            <div className="text-sm">
              <a href="#" className="font-medium text-yellow-500 hover:text-yellow-700">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </motion.form>

        <motion.div className="mt-6 text-center">
        <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-900 to-yellow-900 hover:from-yellow-900">
                        Don't have an account?{" "}
                        <span className="font-semibold underline cursor-pointer hover:text-yellow-500" onClick={() => navigate("/auth/register")}>
                          Sign Up!
                        </span>
                      </p>
                    
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginUI;