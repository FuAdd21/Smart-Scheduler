import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const isHome = location.pathname === "/";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkHome = isHome && !scrolled;

  // Always solid white if not on Home page, or if scrolled
  const navbarClasses = isDarkHome
    ? "bg-transparent py-6"
    : "bg-white/80 backdrop-blur-md shadow-sm py-4";

  const logoBoxClasses = isDarkHome
    ? "bg-[#2b49ff] border border-white/20 text-white"
    : "bg-blue-600 text-white";

  const brandTextClasses = isDarkHome ? "text-white" : "text-gray-900";
  const navLinkClasses = isDarkHome
    ? "text-white/80 hover:text-white font-medium transition"
    : "text-gray-600 hover:text-blue-600 font-medium transition";
  const loginClasses = isDarkHome
    ? "font-medium text-white/80 hover:text-white transition"
    : "font-medium text-gray-600 hover:text-black transition";
  const ctaClasses = isDarkHome
    ? "bg-[#2b49ff] text-white font-semibold py-2.5 px-6 rounded-full hover:bg-[#1f3dff] transition shadow-[0_10px_24px_rgba(43,73,255,0.32)]"
    : "bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-full hover:bg-blue-700 transition shadow-sm hover:shadow-md transform hover:-translate-y-0.5";

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarClasses}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 justify-self-start">
           <Link to="/" className="flex items-center gap-2">
             <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xl ${logoBoxClasses}`}>S</div>
             <span className={`text-xl font-bold tracking-tight ${brandTextClasses}`}>SmartScheduler</span>
           </Link>
        </div>

        <div className="hidden md:flex items-center justify-center gap-8">
          {isHome && (
            <>
              <a href="#features" className={navLinkClasses}>Features</a>
              <a href="#solutions" className={navLinkClasses}>Solutions</a>
              <a href="#pricing" className={navLinkClasses}>Pricing</a>
              <a href="#enterprise" className={navLinkClasses}>Enterprise</a>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center justify-end gap-4 justify-self-end">
          {user ? (
            <div className="flex items-center gap-4">
              <span className={isDarkHome ? "text-white font-medium" : "text-gray-900 font-medium"}>Hi, {user.name.split(' ')[0]}</span>
              <Link to="/dashboard" className="font-medium text-blue-600 hover:text-blue-500 transition">Dashboard</Link>
            </div>
          ) : (
            <>
              <Link to="/login" className={loginClasses}>Login</Link>
              <Link to="/register" className={ctaClasses}>
                Sign Up Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
