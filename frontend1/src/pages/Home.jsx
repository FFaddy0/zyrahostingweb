import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Server, 
  Shield, 
  Zap, 
  Globe, 
  Clock, 
  CheckCircle2,
  Database,
  HardDrive,
  Cpu
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { toast } from "react-hot-toast";

function Home() {
  const { isAuthenticated } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();
  
  // Handle placeholder links
  const handlePlaceholderLink = (e, pageName) => {
    e.preventDefault();
    toast.info(`${pageName} page coming soon!`);
  };

  const features = [
    {
      icon: Server,
      title: "High Performance",
      description: "Lightning-fast SSD storage with High-End Next-Gen CPUs optimized configurations for maximum speed."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Advanced firewall and DDOS protection for all of our services."
    },
    {
      icon: Globe,
      title: "Global CDN (soon)",
      description: "Content delivery network with servers across the globe for faster loading times."
    },
    {
      icon: Clock,
      title: "99.9% Uptime",
      description: "We guarantee your website will be available 24/7/365 with minimal downtime."
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: 9.99,
      features: [
        "1 Website",
        "5GB SSD Storage",
        "10GB Bandwidth",
        "1 Email Account",
        "Free SSL Certificate",
        "24/7 Support"
      ],
      isPopular: false,
      ctaText: "Choose Starter"
    },
    {
      name: "Business",
      price: 19.99,
      features: [
        "10 Websites",
        "50GB SSD Storage",
        "Unlimited Bandwidth",
        "10 Email Accounts",
        "Free SSL Certificate",
        "Daily Backups",
        "24/7 Priority Support"
      ],
      isPopular: true,
      ctaText: "Choose Business"
    },
    {
      name: "Enterprise",
      price: 39.99,
      features: [
        "Unlimited Websites",
        "100GB SSD Storage",
        "Unlimited Bandwidth",
        "Unlimited Email Accounts",
        "Free SSL Certificate",
        "Daily Backups",
        "Dedicated Resources",
        "24/7 Premium Support"
      ],
      isPopular: false,
      ctaText: "Choose Enterprise"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-blue-900'
              }`}>
                The Hosting Service for The <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">People</span>
              </h1>
              
              <p className={`text-xl mb-8 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Blazing fast, secure and scalable hosting solutions for your websites and applications.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/signup")}
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg font-medium shadow-lg flex items-center justify-center text-lg"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                
                <a href="#" onClick={(e) => handlePlaceholderLink(e, "Plans")} className="sm:w-auto w-full">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full px-8 py-4 bg-transparent rounded-lg font-medium text-lg ${
                      isDarkMode 
                        ? 'text-white border border-white/30' 
                        : 'text-blue-800 border border-blue-300'
                    }`}
                  >
                    View Plans
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative"
            >
              <div className="relative z-10">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzFhMWEyZSIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjMwMCIgcj0iNTAiIGZpbGw9IiMzNDgyZjYiLz48cmVjdCB4PSIyMDAiIHk9IjIwMCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM0ODJmNiIgc3Ryb2tlLXdpZHRoPSI4Ii8+PC9zdmc+" 
                  alt="Server illustration" 
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-36 h-36 bg-blue-500/30 rounded-full blur-2xl z-0"></div>
              <div className="absolute -top-4 -left-4 w-36 h-36 bg-purple-500/30 rounded-full blur-2xl z-0"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Trusted By Section */}
      {/* 
      <section className={`py-12 px-4 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-blue-100/70'
      }`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-xl text-center mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Trusted by 10,000+ businesses worldwide </h2>
          <div className="flex flex-wrap justify-center gap-12">
            {['Windows', 'Microoft', 'Nokia', 'Vodafone', 'Al Ahly FC'].map((company) => (
              <div key={company} className={`text-xl font-semibold ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-blue-900'
          }`}>
            Features designed for performance
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Our hosting platform is built from the ground up with speed, security, and scalability in mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`backdrop-blur-sm rounded-xl p-6 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border border-gray-700/30' 
                  : 'bg-gray-50/80 border border-blue-200'
              }`}
            >
              <div className={`p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 ${
                isDarkMode ? 'bg-blue-500/20' : 'bg-blue-200'
              }`}>
                <feature.icon className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-blue-900'
              }`}>{feature.title}</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-900/30 to-blue-800/30' 
          : 'bg-gradient-to-r from-blue-100 to-indigo-100'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-blue-900'
              }`}>
                Why choose ZyraHosting?
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className={`text-xl font-medium ${
                      isDarkMode ? 'text-white' : 'text-blue-900'
                    }`}>Optimized Performance</h3>
                    <p className={isDarkMode ? 'text-gray-300 mt-1' : 'text-gray-700 mt-1'}>All servers are configured with latest optimizations for PHP, MySQL, and WordPress.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className={`text-xl font-medium ${
                      isDarkMode ? 'text-white' : 'text-blue-900'
                    }`}>Free Migrations</h3>
                    <p className={isDarkMode ? 'text-gray-300 mt-1' : 'text-gray-700 mt-1'}>We'll handle your website migration from any other host, completely free of charge.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className={`text-xl font-medium ${
                      isDarkMode ? 'text-white' : 'text-blue-900'
                    }`}>30-Day Money Back</h3>
                    <p className={isDarkMode ? 'text-gray-300 mt-1' : 'text-gray-700 mt-1'}>Not satisfied? Get a full refund within the first 30 days, no questions asked.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className={`text-xl font-medium ${
                      isDarkMode ? 'text-white' : 'text-blue-900'
                    }`}>24/7 Expert Support</h3>
                    <p className={isDarkMode ? 'text-gray-300 mt-1' : 'text-gray-700 mt-1'}>Our technical support team is available 24/7 to help with any issues.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className={`backdrop-blur-sm rounded-xl p-6 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border border-gray-700/30' 
                  : 'bg-gray-50/80 border border-blue-200'
              }`}>
                <Database className="h-8 w-8 text-blue-500 mb-3" />
                <h3 className={`text-xl font-medium mb-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Database Optimization</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Automatically optimized database queries and tables.</p>
              </div>
              
              <div className={`backdrop-blur-sm rounded-xl p-6 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border border-gray-700/30' 
                  : 'bg-gray-50/80 border border-blue-200'
              }`}>
                <HardDrive className="h-8 w-8 text-blue-500 mb-3" />
                <h3 className={`text-xl font-medium mb-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>NVMe Storage</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Ultrafast NVMe SSD storage for all hosting plans.</p>
              </div>
              
              <div className={`backdrop-blur-sm rounded-xl p-6 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border border-gray-700/30' 
                  : 'bg-gray-50/80 border border-blue-200'
              }`}>
                <Cpu className="h-8 w-8 text-blue-500 mb-3" />
                <h3 className={`text-xl font-medium mb-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Dedicated Resources</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Guaranteed CPU and RAM with no overselling.</p>
              </div>
              
              <div className={`backdrop-blur-sm rounded-xl p-6 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border border-gray-700/30' 
                  : 'bg-gray-50/80 border border-blue-200'
              }`}>
                <Globe className="h-8 w-8 text-blue-500 mb-3" />
                <h3 className={`text-xl font-medium mb-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Global Data Centers</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Choose from data centers across North America, Europe, and Asia.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-blue-900'
          }`}>
            Simple, transparent pricing
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            No hidden fees, no contracts. Choose the plan that works for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`backdrop-blur-sm rounded-xl overflow-hidden relative flex flex-col h-full ${
                plan.isPopular 
                  ? 'border-2 border-blue-500' 
                  : isDarkMode 
                    ? 'border border-gray-700/30'
                    : 'border border-blue-200'
              } ${
                isDarkMode 
                  ? 'bg-gray-800/50' 
                  : 'bg-gray-50/80'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className={`text-3xl sm:text-4xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-blue-900'
                  }`}>${plan.price}</span>
                  <span className={isDarkMode ? 'text-gray-400 ml-1' : 'text-gray-600 ml-1'}>/month</span>
                </div>
                
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a href="#" onClick={(e) => handlePlaceholderLink(e, plan.name + " Plan")} className="w-full block mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3 rounded-lg font-medium ${
                      plan.isPopular 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : isDarkMode
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
                    }`}
                  >
                    {plan.ctaText}
                  </motion.button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-blue-600/20' 
          : 'bg-gradient-to-r from-blue-200/80 to-indigo-200/80'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-blue-900'
            }`}>
              Ready to get started with ZyraHosting?
            </h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Join thousands of businesses that trust ZyraHosting for their hosting needs.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => isAuthenticated ? handlePlaceholderLink(e, "Dashboard") : navigate("/signup")}
                className="px-8 py-4 bg-blue-500 text-white rounded-lg font-medium shadow-lg flex items-center justify-center text-lg"
              >
                {isAuthenticated ? "Go to Dashboard" : "Create Account"} <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              
              <a href="#" onClick={(e) => handlePlaceholderLink(e, "Contact Sales")} className="sm:w-auto w-full">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full px-8 py-4 bg-transparent rounded-lg font-medium text-lg ${
                    isDarkMode 
                      ? 'text-white border border-white/30' 
                      : 'text-blue-800 border border-blue-300'
                  }`}
                >
                  Contact Sales
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
  }
  
  export default Home;
  