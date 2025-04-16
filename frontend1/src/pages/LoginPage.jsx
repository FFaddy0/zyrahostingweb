import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { toast } from "react-hot-toast";

import Input from "../components/Input";

function LoginPage() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const {error, login, isLoading} = useAuthStore();
    const { isDarkMode } = useThemeStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!identifier || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        
        try {
            await login(identifier, password);
            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            toast.error("Login failed");
        }
    }
    
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
                Welcome Back
            </h2>

            <form onSubmit={handleSubmit}>
                <Input 
                icon={Mail}
                iconColor={isDarkMode ? "text-blue-400" : "text-blue-600"}
                type="text"  
                placeholder="Email or Username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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

                {error && <p className="text-red-500 font-semibold mb-2 text-center">{error}</p>}

                <div className="flex items-center mb-6">
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        toast.info("Forgot password feature coming soon!");
                    }} className={`text-sm hover:underline transition duration-200 ${
                      isDarkMode ? 'text-blue-400 hover:text-blue-500' : 'text-blue-600 hover:text-blue-700'
                    }`}>
                        Forgot Password?
                    </a>
                </div>
                <motion.button 
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                type="submit"
                className="mt-5 w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-blue-500 font-bold shadow-lg"
                disabled={isLoading}
                >
                    {isLoading ? <Loader2 className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
                </motion.button>
                </form>      
        </div>

        <div className={`px-8 py-4 flex justify-center ${
            isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-blue-200 bg-opacity-50'
        }`}>
				<p className={isDarkMode ? 'text-sm text-gray-400' : 'text-sm text-gray-600'}>
					Don't have an account?{" "}
					<Link to='/signup' className='text-blue-500 hover:underline'>
						Register
					</Link>
				</p>
			</div>
    </motion.div>;
  }
  
  export default LoginPage;
  