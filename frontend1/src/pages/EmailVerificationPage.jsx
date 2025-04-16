import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [isAutoVerifying, setIsAutoVerifying] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { error, verifyEmail, isLoading, isAuthenticated } = useAuthStore();
    const { isDarkMode } = useThemeStore();

    // Auto-verify from URL parameter
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const codeFromUrl = urlParams.get('code');
        
        if (codeFromUrl) {
            setIsAutoVerifying(true);
            handleAutoVerify(codeFromUrl);
        }
    }, [location]);

    const handleAutoVerify = async (codeFromUrl) => {
        try {
            await verifyEmail(codeFromUrl);
            setVerificationSuccess(true);
            toast.success("Email verified successfully");
        } catch (error) {
            setIsAutoVerifying(false);
            toast.error("Automatic verification failed. Please enter the code manually.");
            // If auto-verification fails, prefill the code inputs for the user
            if (codeFromUrl.length === 6) {
                const codeArray = codeFromUrl.split('');
                setCode(codeArray);
            }
        }
    };
    
    const handleChange = (index, value) => {
		const newCode = [...code];

		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		if (e) e.preventDefault();
		const verificationCode = code.join("");
		try {
			await verifyEmail(verificationCode);
			setVerificationSuccess(true);
			toast.success("Email verified successfully");
		} catch (error) {
			console.log(error);
            toast.error("Verification failed. Please try again.");
		}
	};

    useEffect(() => {
		if (!isAutoVerifying && !verificationSuccess && code.every((digit) => digit !== "")) {
			handleSubmit();
		}
	}, [code, isAutoVerifying, verificationSuccess]);

    // Show success screen
    if (verificationSuccess) {
        return (
            <div className={`backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8 w-full max-w-md mx-auto ${
                isDarkMode 
                  ? 'bg-gray-900 bg-opacity-50' 
                  : 'bg-white bg-opacity-60'
            }`}>
                <div className="flex justify-center mb-6">
                    <div className="bg-green-500 rounded-full p-3">
                        <Check className="text-white h-10 w-10" />
                    </div>
                </div>
                <h2 className={`text-3xl font-bold mb-4 text-center bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 ${
                    isDarkMode ? 'text-white' : 'text-transparent'
                }`}>
                    Email Verified!
                </h2>
                <p className={`text-center mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Your Email has been successfully verified.
                </p>
                
                {isAuthenticated ? (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/")}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-700 transition duration-200"
                    >
                        Go to Dashboard
                    </motion.button>
                ) : (
                    <div className="space-y-4">
                        <p className={`text-center mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            You're not logged in on this device.
                        </p>
                        <Link to="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-700 transition duration-200"
                            >
                                Log In Now
                            </motion.button>
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    // Show auto-verifying screen
    if (isAutoVerifying) {
        return (
            <div className={`backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8 w-full max-w-md mx-auto ${
                isDarkMode 
                  ? 'bg-gray-900 bg-opacity-50' 
                  : 'bg-white bg-opacity-60'
            }`}>
                <h2 className={`text-3xl font-bold mb-8 text-center bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 ${
                    isDarkMode ? 'text-white' : 'text-transparent'
                }`}>
                    Verifying Your Email
                </h2>
                <div className="flex justify-center">
                    <Loader2 className="text-blue-500 animate-spin h-12 w-12" />
                </div>
                <p className={`text-center mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Please wait while we verify your email...
                </p>
            </div>
        );
    }

    // Show manual verification screen
    return (
        <div className="flex justify-center">
            <motion.div
            initial={{opacity: 0, y: -50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: "easeOut"}}
            className={`backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8 w-full max-w-md mx-auto ${
                isDarkMode 
                  ? 'bg-gray-900 bg-opacity-50' 
                  : 'bg-white bg-opacity-60'
            }`}
            >
                <h2 className={`text-3xl font-bold mb-8 text-center bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 ${
                    isDarkMode ? 'text-white' : 'text-transparent'
                }`}>
                    Verify Your Email
                </h2>
                <p className={`text-center mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    We've sent a verification code to your email. Please enter the code below to verify your account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between">
                        {code.map((digit, index) => (
                            <input
                            ref={(el) => (inputRefs.current[index] = el)}
                            key={index}
                            type="text"
                            maxLength={6}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className={`text-2xl w-12 h-12 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                                isDarkMode 
                                  ? 'bg-gray-700 text-white' 
                                  : 'bg-blue-50 text-gray-800'
                            }`}
                            />
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type='submit'
                            disabled={isLoading || code.some((digit) => !digit)}
                            className='w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50'
                        >
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5 mr-2 inline" /> : "Verify Email"}
                        </motion.button>
                </form>
            </motion.div>
        </div>
    ) 
}

export default EmailVerificationPage