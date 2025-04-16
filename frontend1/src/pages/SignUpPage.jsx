import {motion} from "framer-motion";
import { useState } from "react";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { toast } from "react-hot-toast";

import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

function SignUpPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {signup, error, isLoading} = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    try {
      await signup(email, password, name);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

    return <motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5, ease: "easeOut"}}
    className={`max-w-md w-full backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mx-auto ${
      isDarkMode 
        ? 'bg-gray-900 bg-opacity-50' 
        : 'bg-blue-100 bg-opacity-70'
    }`}
    >
      <div className="p-8">
        <h2 className={`text-3xl font-bold mb-8 text-center bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 ${
          isDarkMode ? 'text-white' : 'text-transparent'
        }`}>
          Create an Account
          </h2>

          <form onSubmit={handleSubmit}>
            <Input 
            icon={User} 
            iconColor={isDarkMode ? "text-blue-400" : "text-blue-600"}
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isDarkMode={isDarkMode}
            />
            <Input 
            icon={Mail} 
            iconColor={isDarkMode ? "text-blue-400" : "text-blue-600"}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isDarkMode={isDarkMode}
            />
            <Input 
            icon={Lock} 
            iconColor={isDarkMode ? "text-blue-500" : "text-blue-600"}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isDarkMode={isDarkMode}
            />
            <Input 
            icon={Lock} 
            iconColor={isDarkMode ? "text-blue-500" : "text-blue-600"}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isDarkMode={isDarkMode}
            />

            {error && <p className="text-red-500 text-center text-semibold mb-2">{error}</p>}
            
            <PasswordStrengthMeter password={password} confirmPassword={confirmPassword} isDarkMode={isDarkMode} />

            <motion.button 
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            type="submit"
            className="mt-5 w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-blue-500 shadow-lg"
            disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Sign Up"}
            </motion.button>
          </form>
      </div>
      <div className={`px-8 py-4 flex justify-center ${
        isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-blue-200 bg-opacity-50'
      }`}>
        <p className={isDarkMode ? 'text-white text-sm' : 'text-gray-700 text-sm'}>
          Already have an account? <Link to="/login" className={isDarkMode ? "text-blue-500 hover:underline" : "text-blue-600 hover:underline"}>Login</Link>
        </p>
      </div>


    </motion.div>;
  }
  
  export default SignUpPage;
  