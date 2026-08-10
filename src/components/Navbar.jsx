import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useProductContext } from "./ProductContext";
import { useAuth } from "./AuthContext/AuthContext";

function Navbar() {
  const navRef = useRef(null);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Context se cart aur auth state
  const { cart } = useProductContext();
  const { user, logoutUser } = useAuth();

  // Google / Custom Profile Image URL check
  const userPhoto = user?.photoURL || user?.avatar || user?.picture;

  // Total items in cart calculation
  const totalCartCount = cart ? cart.reduce((acc, item) => acc + (item.quantity || 1), 0) : 0;

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" }
      );
    }
  }, []);

  // Sync active tab with current URL path
  useEffect(() => {
    if (location.pathname === "/home" || location.pathname === "/") {
      setActiveTab("home");
    } else if (location.pathname.includes("/products")) {
      setActiveTab("products");
    } else if (location.pathname === "/cart") {
      setActiveTab("cart");
    } else if (location.pathname === "/profile" || location.pathname === "/Auth") {
      setActiveTab("profile");
    }
  }, [location]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav
        ref={navRef}
        className="bg-white/80 backdrop-blur-xl border border-gray-200/80 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex items-center gap-3 sm:gap-6 transition-all duration-300"
      >
        {/* Brand Logo */}
        <Link 
          to="/home" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 pr-3 sm:pr-4 border-r border-gray-200 cursor-pointer"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            AURA<span className="text-slate-400">.LAB</span>
          </span>
          <span className="text-lg font-bold text-slate-900"></span>
        </Link>

        {/* Minimal Icon Navigation */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Home Icon */}
          <Link
            to="/home"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
              activeTab === "home"
                ? "bg-slate-900 text-white shadow-md scale-105"
                : "text-gray-500 hover:text-slate-900 hover:bg-gray-100"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 00-1 1m-6 0h6" />
            </svg>
          </Link>

          {/* Products Link */}
          <Link
            to="/products"
            onClick={() => {
              setActiveTab("products");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
              activeTab === "products"
                ? "bg-slate-900 text-white shadow-md scale-105"
                : "text-gray-500 hover:text-slate-900 hover:bg-gray-100"
            }`}
            title="Products"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </Link>

          {/* Saved/Wishlist Icon */}
          <button
            onClick={() => setActiveTab("saved")}
            className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
              activeTab === "saved"
                ? "bg-slate-900 text-white shadow-md scale-105"
                : "text-gray-500 hover:text-slate-900 hover:bg-gray-100"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Cart Icon with Dynamic Badge */}
          <Link
            to="/cart"
            onClick={() => setActiveTab("cart")}
            className={`relative p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
              activeTab === "cart"
                ? "bg-slate-900 text-white shadow-md scale-105"
                : "text-gray-500 hover:text-slate-900 hover:bg-gray-100"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>

            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                {totalCartCount}
              </span>
            )}
          </Link>

          {/* Profile Icon / Auth Link */}
          <div className="relative inline-flex items-center">
            {user ? (
              /* LOGGED IN: Profile Avatar Button */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase overflow-hidden border transition-all duration-200 outline-none ${
                    activeTab === "profile"
                      ? "bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900 ring-offset-2 scale-105"
                      : "bg-slate-900 text-white border-transparent hover:bg-slate-800 hover:scale-105"
                  }`}
                  title={user?.name || "Profile"}
                >
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt={user?.name || "Profile"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <span>{user?.name ? user.name.charAt(0) : "U"}</span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200/80 rounded-2xl shadow-xl z-50 py-2 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user?.name || "User"}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setActiveTab("profile");
                      }}
                      className="block px-4 py-2 text-xs font-semibold hover:bg-gray-50 text-slate-700 transition-colors"
                    >
                      View Profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logoutUser();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* NOT LOGGED IN: Auth Link Icon */
              <Link
                to="/Auth"
                onClick={() => setActiveTab("profile")}
                className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
                  activeTab === "profile"
                    ? "bg-slate-900 text-white shadow-md scale-105"
                    : "text-gray-500 hover:text-slate-900 hover:bg-gray-100"
                }`}
                title="Account"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;