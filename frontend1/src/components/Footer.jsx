import { Link } from "react-router-dom";
import { Server } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkMode } = useThemeStore();
  
  return (
    <footer className={`py-8 w-full mt-auto ${
      isDarkMode ? 'bg-gray-900' : 'bg-blue-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <Server className="h-5 w-5 text-blue-600 mr-2" />
              <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>ZyraHosting</span>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              &copy; {currentYear} ZyraHosting. All rights reserved.
            </p>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-blue-900'}`}>
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-blue-900'}`}>
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-blue-900'}`}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-blue-900'}`}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-blue-900'}`}>
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-blue-900'}`}>
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 