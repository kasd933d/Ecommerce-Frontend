import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

function Navbar() {
  const navRef = useRef(null);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");

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
    if (location.pathname === "/home") {
      setActiveTab("home");
    }
  }, [location]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav
        ref={navRef}
        className="bg-white/80 backdrop-blur-xl border border-gray-200/80 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex items-center gap-3 sm:gap-6 transition-all duration-300"
      >
        {/* Brand Logo - Navigates to /home */}
        <Link 
          to="/home" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 pr-3 sm:pr-4 border-r border-gray-200 cursor-pointer"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            STORE<span className="text-slate-400">.LAB</span>
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

          {/* Search Icon */}
          <button
            onClick={() => setActiveTab("search")}
            className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
              activeTab === "search"
                ? "bg-slate-900 text-white shadow-md scale-105"
                : "text-gray-500 hover:text-slate-900 hover:bg-gray-100"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

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

          {/* Cart Icon with Badge */}
          <button
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
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              2
            </span>
          </button>

          {/* Profile Icon */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
              activeTab === "profile"
                ? "bg-slate-900 text-white shadow-md scale-105"
                : "text-gray-500 hover:text-slate-900 hover:bg-gray-100"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;