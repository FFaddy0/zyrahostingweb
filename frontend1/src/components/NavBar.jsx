import { Link } from "react-router-dom";
import { Server, Moon, Sun } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { toast } from "react-hot-toast";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };
  
  const handlePlaceholderLink = (e, pageName) => {
    e.preventDefault();
    toast.info(`${pageName} page coming soon!`);
  };

  return (
    <nav className={`backdrop-filter backdrop-blur-lg py-3 border-b ${
      isDarkMode
        ? 'bg-gray-900 bg-opacity-70 border-gray-800'
        : 'bg-blue-100 bg-opacity-70 border-blue-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Server className={`h-6 w-6 text-blue-600 mr-2`} />
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>ZyraHosting</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-900'}`}>
              Home
            </Link>
            <a href="#" onClick={(e) => handlePlaceholderLink(e, "Features")} className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-900'}`}>
              Features
            </a>
            <a href="#" onClick={(e) => handlePlaceholderLink(e, "Pricing")} className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-900'}`}>
              Pricing
            </a>
            <a href="#" onClick={(e) => handlePlaceholderLink(e, "Contact")} className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-900'}`}>
              Contact
            </a>
          </div>

          {/* Authentication and Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? 
                <Sun className="h-5 w-5" /> : 
                <Moon className="h-5 w-5" />
              }
            </button>
            
            {isAuthenticated ? (
              <>
                <span className={`text-sm hidden md:inline ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Hello, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white text-sm px-4 py-2 rounded transition-colors`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-800'}`}>
                  Login
                </Link>
                <Link to="/signup" className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white text-sm px-4 py-2 rounded transition-colors`}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 