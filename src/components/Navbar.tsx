
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const Navbar = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const vehicleDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks for dropdowns
  useOnClickOutside(vehicleDropdownRef, () => setVehicleDropdownOpen(false));
  useOnClickOutside(profileDropdownRef, () => setProfileDropdownOpen(false));
  useOnClickOutside(mobileMenuRef, () => setMobileMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setVehicleDropdownOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Toggle dropdown instead of just opening
  const toggleVehicleDropdown = () => {
    setVehicleDropdownOpen(!vehicleDropdownOpen);
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 py-4"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Swift<span className="text-secondary">Ride</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`nav-link ${location.pathname === "/" ? "active-nav-link" : ""}`}>
              Home
            </Link>
            
            {/* Vehicle Dropdown - Fixed to toggle properly */}
            <div className="relative group" ref={vehicleDropdownRef}>
              <button 
                className={`nav-link flex items-center ${["/cars", "/buses", "/minibuses", "/coasters"].includes(location.pathname) ? "active-nav-link" : ""}`}
                onClick={toggleVehicleDropdown}
              >
                Vehicles <i className={`fas fa-chevron-${vehicleDropdownOpen ? "up" : "down"} ml-1 text-xs`}></i>
              </button>
              <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ${vehicleDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <Link to="/cars" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setVehicleDropdownOpen(false)}>Cars</Link>
                <Link to="/buses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setVehicleDropdownOpen(false)}>Buses</Link>
                <Link to="/minibuses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setVehicleDropdownOpen(false)}>Mini Buses</Link>
                <Link to="/coasters" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setVehicleDropdownOpen(false)}>Coasters</Link>
              </div>
            </div>
            
            <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active-nav-link" : ""}`}>
              About Us
            </Link>
            <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "active-nav-link" : ""}`}>
              Contact
            </Link>
          </div>

          {/* Search and Auth - Moved search to align next to login button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Form - Moved here */}
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-sm w-32 lg:w-auto"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="ml-2 text-gray-600">
                <i className="fas fa-search"></i>
              </button>
            </form>

            {user ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span>{user.name.split(" ")[0]}</span>
                  <i className={`fas fa-chevron-${profileDropdownOpen ? "up" : "down"} text-xs`}></i>
                </button>
                
                {/* Profile Dropdown - Improved styling */}
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50 ${profileDropdownOpen ? "block" : "hidden"}`}>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileDropdownOpen(false)}>Profile</Link>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileDropdownOpen(false)}>Dashboard</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileDropdownOpen(false)}>Settings</Link>
                  <button 
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-gray-100 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none"
            >
              <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          ref={mobileMenuRef}
          className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} pt-4 absolute top-full left-0 w-full bg-white shadow-lg z-40`}
        >
          <div className="flex flex-col space-y-4 pb-4 max-h-[80vh] overflow-y-auto px-4">
            <Link to="/" className="nav-link">Home</Link>
            
            {/* Mobile Vehicle Dropdown */}
            <button 
              onClick={() => setVehicleDropdownOpen(!vehicleDropdownOpen)}
              className="flex justify-between items-center nav-link text-left"
            >
              Vehicles <i className={`fas ${vehicleDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"} text-xs`}></i>
            </button>
            
            {vehicleDropdownOpen && (
              <div className="pl-4 flex flex-col space-y-2">
                <Link to="/cars" className="nav-link">Cars</Link>
                <Link to="/buses" className="nav-link">Buses</Link>
                <Link to="/minibuses" className="nav-link">Mini Buses</Link>
                <Link to="/coasters" className="nav-link">Coasters</Link>
              </div>
            )}
            
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-sm w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="ml-2 text-gray-600">
                <i className="fas fa-search"></i>
              </button>
            </form>
            
            {/* Mobile Auth */}
            {user ? (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center mb-4">
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-2">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link to="/profile" className="nav-link">Profile</Link>
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  <Link to="/settings" className="nav-link">Settings</Link>
                  <button 
                    onClick={logout}
                    className="text-left text-red-500 hover:text-red-700 flex items-center"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 border-t border-gray-200 pt-4">
                <Link to="/login" className="btn-primary w-full text-center">
                  Login
                </Link>
                <Link to="/signup" className="btn-secondary w-full text-center">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
