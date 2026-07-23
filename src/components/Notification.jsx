import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function IPhoneNotification({ product, onClose }) {
  const islandRef = useRef(null);

  useEffect(() => {
    if (islandRef.current) {
      // iOS Dynamic Island Expand Animation
      gsap.fromTo(
        islandRef.current,
        { y: -60, scaleX: 0.5, opacity: 0 },
        { y: 0, scaleX: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }

    // Auto dismiss after 3.5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (islandRef.current) {
      gsap.to(islandRef.current, {
        y: -50,
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power3.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  if (!product) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[380px] pointer-events-auto">
      <div
        ref={islandRef}
        className="bg-black/90 text-white backdrop-blur-2xl border border-white/20 p-3.5 rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-between gap-3 transition-all"
      >
        {/* Left Image & Status */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative w-11 h-11 rounded-2xl bg-slate-800 shrink-0 overflow-hidden border border-white/10">
            <img
              src={product.thumbnail || product.images?.[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0 text-left">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                Added to Bag
              </p>
            </div>
            <h4 className="text-xs font-semibold text-white truncate max-w-[170px]">
              {product.title}
            </h4>
            <p className="text-[11px] text-gray-400 font-medium">${product.price}</p>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/cart"
            onClick={handleClose}
            className="bg-white text-black hover:bg-gray-200 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all active:scale-95 shadow-sm"
          >
            View Bag
          </Link>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white p-1 text-xs"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}