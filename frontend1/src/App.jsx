import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";
import { useEffect } from "react";

import FloatingShape from "./components/FloatingShape";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import LoadingSpinner from "./components/LoadingSpinner";

const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
}

const RedirectAuthenticated = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  
  if (isAuthenticated && user && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) { 
    return <LoadingSpinner />
  }
  
  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white' 
        : 'bg-gradient-to-br from-blue-200 via-indigo-200 to-blue-300 text-gray-800'
    }`}>
      <NavBar />
      
      <div className="flex-grow flex items-center justify-center pt-16 pb-8">
        <FloatingShape 
          color={isDarkMode ? "bg-blue-900" : "bg-blue-600"} 
          size="w-64 h-64" 
          top="10%" 
          left="10%" 
          delay={0} 
        />
        <FloatingShape 
          color={isDarkMode ? "bg-purple-900" : "bg-indigo-600"} 
          size="w-48 h-48" 
          top="60%" 
          left="70%" 
          delay={2} 
        />
        <FloatingShape 
          color={isDarkMode ? "bg-pink-900" : "bg-pink-500"} 
          size="w-32 h-32" 
          top="30%" 
          left="50%" 
          delay={4} 
        />
        <FloatingShape 
          color={isDarkMode ? "bg-indigo-900" : "bg-cyan-500"} 
          size="w-40 h-40" 
          top="80%" 
          left="20%" 
          delay={6} 
        />
        <FloatingShape 
          color={isDarkMode ? "bg-teal-900" : "bg-teal-600"} 
          size="w-36 h-36" 
          top="15%" 
          left="80%" 
          delay={8} 
        />

        <div className="z-10 w-full flex justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={
              <RedirectAuthenticated>
                <SignUpPage />
              </RedirectAuthenticated>
            } />
            <Route path="/login" element={
              <RedirectAuthenticated>
                <LoginPage />
              </RedirectAuthenticated>
            } />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
          </Routes>
        </div>
      </div>
      
      <Footer />
      <Toaster 
        toastOptions={{
          style: {
            background: isDarkMode ? '#2D3748' : '#E6F0FF',
            color: isDarkMode ? '#FFFFFF' : '#1A202C',
          },
        }}
      />
    </div>
  );
}

export default App;
