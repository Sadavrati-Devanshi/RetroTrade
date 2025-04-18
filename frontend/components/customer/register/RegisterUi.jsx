// // RegisterUI.jsx
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Check, Camera, Upload, ArrowRight } from "lucide-react";
// import bgImage from "../../../images/bgimg.jpg";
// import { Navigate } from "react-router-dom";

// const RegisterUI = ({ formData, handleChange, handleRoleChange, handleSubmit, handleImageUpload, loading, activeTab, setActiveTab }) => {
//   return (
//     <div
//       className="relative flex items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#3B2F2F] via-[#91684A] to-[#C9A66B]"
//       style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="relative w-full max-w-lg mt-12 p-5 rounded-xl shadow-xl border border-yellow-400 bg-[#f8f1e7]/65 max-h-[85vh] overflow-y-hidden"
//       >
//         <Card className="bg-transparent shadow-none border-none">
//   <CardHeader className="text-center pb-6">
//     <motion.div
//       initial={{ scale: 0.8 }}
//       animate={{ scale: 1 }}
//       transition={{ type: "spring", stiffness: 260, damping: 20 }}
//       className="flex justify-center mb-4"
//     >
//       <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
//         <Upload className="text-white" size={28} />
//       </div>
//     </motion.div>
//     <motion.h1
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ delay: 0.3 }}
//       className="text-3xl font-bold text-yellow-900"
//     >
//       Create Account
//     </motion.h1>
//     <CardDescription className="text-gray-700">
//       Join RetroTrade and start your journey
//     </CardDescription>
//   </CardHeader>

//   <CardContent>
//     <div className="flex justify-center space-x-4 mb-6">
//       <button
//         className={`px-6 py-2 rounded-md font-medium transition ${activeTab === "account" ? "bg-yellow-600 text-white shadow-md" : "bg-transparent text-yellow-900 border border-yellow-600 hover:bg-yellow-500 hover:text-white"}`}
//         onClick={() => setActiveTab("account")}
//       >
//         Account
//       </button>
//       <button
//         className={`px-6 py-2 rounded-md font-medium transition ${activeTab === "profile" ? "bg-yellow-600 text-white shadow-md" : "bg-transparent text-yellow-900 border border-yellow-600 hover:bg-yellow-500 hover:text-white"}`}
//         onClick={() => setActiveTab("profile")}
//       >
//         Profile
//       </button>
//     </div>

//     <div className="relative h-[360px]">
//       <AnimatePresence mode="wait">
//         {/* Account Tab */}
//         {activeTab === "account" && (
//           <motion.div key="account" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="absolute w-full">
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label className="text-yellow-900">Email</Label>
//                 <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" className="border-yellow-500 bg-white/90" />
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-yellow-900">Password</Label>
//                 <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="border-yellow-500 bg-white/90" />
//               </div>
//               <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white py-3 rounded-lg transition-transform transform hover:scale-105" onClick={() => setActiveTab("profile")}>
//                 Continue <ArrowRight className="ml-2 w-4 h-4" />
//               </Button>
//             </div>
//             <div className="text-center mt-4">
//               <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-900 to-yellow-900 hover:from-yellow-900">
//                 Already have an account?{" "}
//                 <span className="font-semibold underline cursor-pointer hover:text-yellow-500" onClick={() => Navigate("/login")}>
//                   Login
//                 </span>
//               </p>
//             </div>
//           </motion.div>
//         )}

//         {/* Profile Tab with Form for Submission */}
//         {activeTab === "profile" && (
//           <motion.div key="profile" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="absolute w-full">
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label className="text-yellow-900">Full Name</Label>
//                   <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="border-yellow-500 bg-white/90" />
//                 </div>
//                 <div className="flex gap-4">
//   <div className="w-1/2 space-y-2">
//     <Label className="text-yellow-900">City</Label>
//     <Input
//       type="text"
//       name="city"
//       value={formData.city}
//       onChange={handleChange}
//       placeholder="New York"
//       className="border-yellow-500 bg-white/90"
//     />
//   </div>
//   <div className="w-1/2 space-y-2">
//     <Label className="text-yellow-900">UPI ID</Label>
//     <Input
//       type="text"
//       name="upiId"
//       value={formData.upiId}
//       onChange={handleChange}
//       placeholder="example@upi"
//       className="border-yellow-500 bg-white/90"
//     />
//   </div>
// </div>

//                 <div className="flex items-center gap-4">
//                   <div className="flex-1 space-y-2">
//                     <Label className="text-yellow-900">Role</Label>
//                     <Select onValueChange={handleRoleChange} className="border-yellow-500 bg-white/90">
//                       <SelectTrigger className="w-full px-4 py-3 border border-yellow-500">
//                         <SelectValue placeholder="Select your role" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-yellow-100 border border-yellow-500">
//                         <SelectItem value="buyer">Buyer</SelectItem>
//                         <SelectItem value="seller">Seller</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden border border-yellow-500">
//                     {formData.profileImage ? (
//                       <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
//                     ) : (
//                       <Camera className="h-6 w-6 text-gray-500" />
//                     )}
//                   </div>
//                   <label htmlFor="imageUpload" className="border border-yellow-500 px-4 py-2 text-gray-700 text-sm rounded-md cursor-pointer hover:bg-yellow-600 hover:text-white">
//                     Upload
//                   </label>
//                   <input type="file" accept="image/*" id="imageUpload" className="hidden" onChange={handleImageUpload} />
//                 </div>
//                 <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white py-3 rounded-lg transition-transform transform hover:scale-105">
//                   Create Account <Check className="ml-2 w-4 h-4" />
//                 </Button>
//               </div>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   </CardContent>
// </Card>

//       </motion.div>
//     </div>
//   );
// };

// export default RegisterUI;

// RegisterUI.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Camera, Upload, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import bgImage from "../../../images/bgimg.jpg";
import { Navigate } from "react-router-dom";

const RegisterUI = ({ formData, handleChange, handleRoleChange, handleSubmit, handleImageUpload, loading, activeTab, setActiveTab }) => {
    const navigate = useNavigate();
  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#3B2F2F] via-[#91684A] to-[#C9A66B]"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg mt-12 p-5 rounded-xl shadow-xl border border-yellow-400 bg-[#f8f1e7]/65 max-h-[85vh] overflow-y-hidden"
      >
        <Card className="bg-transparent shadow-none border-none">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex justify-center mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <Upload className="text-white" size={28} />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-yellow-900 select-none"
            >  <h3
  className=" text-amber-800 text-lg font-semibold px-2 py-2 rounded-md cursor-pointer select-none  transition-colors duration-200"
  onClick={() => navigate("/")}
>RetroTrade</h3>
              Create Account
            </motion.h1>
            <CardDescription className="text-gray-700 select-none">
              Join RetroTrade and start your journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex justify-center space-x-4 mb-6 select-none">
              <button
                className={`px-6 py-2 rounded-md font-medium transition ${activeTab === "account" ? "bg-yellow-600 text-white shadow-md" : "bg-transparent text-yellow-900 border border-yellow-600 hover:bg-yellow-500 hover:text-white"}`}
                onClick={() => setActiveTab("account")}
              >
                Account
              </button>
              <button
                className={`px-6 py-2 rounded-md font-medium transition ${activeTab === "profile" ? "bg-yellow-600 text-white shadow-md" : "bg-transparent text-yellow-900 border border-yellow-600 hover:bg-yellow-500 hover:text-white"}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </div>

            <div className="relative h-[360px]">
              <AnimatePresence mode="wait">
                {/* Account Tab */}
                {activeTab === "account" && (
                  <motion.div key="account" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="absolute w-full">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-yellow-900">Email</Label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" className="border-yellow-500 bg-white/90" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-yellow-900">Password</Label>
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="border-yellow-500 bg-white/90" />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white py-3 rounded-lg transition-transform transform hover:scale-105" onClick={() => setActiveTab("profile")}>
                        Continue <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-900 to-yellow-900 hover:from-yellow-900">
                        Already have an account?{" "}
                        <span className="font-semibold underline cursor-pointer hover:text-yellow-500" onClick={() => navigate("/auth/login")}>
                          Login
                        </span>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Profile Tab with Form for Submission */}
                {activeTab === "profile" && (
                  <motion.div key="profile" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="absolute w-full">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="space-y-2">
                          <Label className="text-yellow-900">Full Name</Label>
                          <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="border-yellow-500 bg-white/90" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-yellow-900">Contact</Label>
                          <Input type="tel"  maxLength={10} name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" className="border-yellow-500 bg-white/90" />
                        </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="w-full space-y-2">
                            <Label className="text-yellow-900">City</Label>
                            <Input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="New York"
                              className="border-yellow-500 bg-white/90"
                            />
                          </div>
                          
                          {/* UPI ID field only shown when role is seller */}
                          {formData.role === "seller" && (
                            <div className="w-full space-y-2">
                              <Label className="text-yellow-900">UPI ID</Label>
                              <Input
                                type="text"
                                name="upiId"
                                value={formData.upiId}
                                onChange={handleChange}
                                placeholder="example@upi"
                                className="border-yellow-500 bg-white/90"
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex-1 space-y-2">
                            <Label className="text-yellow-900">Role</Label>
                            <Select onValueChange={handleRoleChange} defaultValue={formData.role} className="border-yellow-500 bg-white/90">
                              <SelectTrigger className="w-full px-4 py-3 border border-yellow-500">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                              <SelectContent className="bg-yellow-100 border border-yellow-500">
                                <SelectItem value="buyer">Buyer</SelectItem>
                                <SelectItem value="seller">Seller</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden border border-yellow-500">
                            {formData.profileImage ? (
                              <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                            ) : (
                              <Camera className="h-6 w-6 text-gray-500" />
                            )}
                          </div>
                          <label htmlFor="imageUpload" className="border border-yellow-500 px-4 py-2 text-gray-700 text-sm rounded-md cursor-pointer hover:bg-yellow-600 hover:text-white">
                            Upload
                          </label>
                          <input type="file" accept="image/*" id="imageUpload" className="hidden" onChange={handleImageUpload} />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white py-3 rounded-lg transition-transform transform hover:scale-105">
                          Create Account <Check className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterUI;