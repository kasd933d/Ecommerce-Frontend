import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProductContext } from "./ProductContext";
import { useAuth } from "./AuthContext/AuthContext";
 // 👈 AuthContext Import Karein

gsap.registerPlugin(ScrollTrigger);

const FirstSection = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth(); // 👈 User aur isAdmin Status Check

  const titleRef = useRef(null);
  const heroRef = useRef(null);
  const phoneRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const badge3Ref = useRef(null);
  const badge4Ref = useRef(null);
  const productSectionRef = useRef(null);

  const { setSelectedProduct } = useProductContext();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=4");
    
               
        const data = await res.json();
       
        if (res.ok) setProducts(data.products);
      } catch (err) {
        console.error("Failed to load featured products", err);
      }
    };
    fetchFeatured();
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power4.out" }
      )
        .fromTo(
          phoneRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          [badge1Ref.current, badge2Ref.current, badge3Ref.current, badge4Ref.current],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.4"
        );

      gsap.to([badge1Ref.current, badge3Ref.current], {
        y: "-=12",
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.easeInOut",
      });

      gsap.to([badge2Ref.current, badge4Ref.current], {
        y: "+=14",
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.easeInOut",
      });

      if (productSectionRef.current && products.length > 0) {
        gsap.fromTo(
          ".section-header",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: productSectionRef.current,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          ".product-card",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: productSectionRef.current,
              start: "top 75%",
            },
          }
        );
        ScrollTrigger.refresh();
      }
    }, heroRef);

    return () => ctx.revert();
  }, [products]);

  const toggleWishlist = (e, productId) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F7F5] text-black font-sans overflow-x-hidden relative">
      
      {/* 👑 ADMIN BUTTON (Sirf tab dikhega jab Logged in User 'ADMIN' hoga) */}
      {user && isAdmin && (
        <button
          onClick={() => navigate("/admin")}
          className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-black hover:bg-neutral-800 text-[#FFE500] font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-full border border-black shadow-[0_8px_25px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span>Admin Dashboard</span>
        </button>
      )}

      {/* --- HERO SECTION --- */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-8 select-none"
      >
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0"
        >
          <h1 className="text-[14vw] sm:text-[15vw] font-black leading-none tracking-tighter text-black uppercase opacity-90 text-center">
            ONLINE
          </h1>
          <h1 className="text-[12vw] sm:text-[13vw] font-black leading-none tracking-tighter text-black uppercase opacity-90 text-center">
            SHOPPING
          </h1>
        </div>

        <div className="relative z-10 w-full max-w-5xl h-[540px] sm:h-[620px] flex items-center justify-center">
          <div
            ref={badge1Ref}
            className="absolute top-2 left-2 sm:left-8 z-20 bg-[#FFE500] text-black p-4 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.15)] max-w-[190px] sm:max-w-[220px]"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <p className="text-xs sm:text-sm font-black uppercase tracking-wider">
                SELLING FAST
              </p>
            </div>
            <p className="text-[11px] sm:text-xs font-bold leading-tight">
              ⚡ Only 5 items left in stock today!
            </p>
          </div>

          <div
            ref={badge2Ref}
            className="absolute bottom-4 right-2 sm:right-8 z-20 bg-[#C084FC] text-black p-4 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.15)] max-w-[210px]"
          >
            <p className="text-xs sm:text-sm font-black flex items-center gap-2 uppercase tracking-wide">
              <span>🚚</span> Express Shipping
            </p>
            <p className="text-[11px] font-bold mt-1">
              *Free delivery on all app orders
            </p>
          </div>

          <div
            ref={badge3Ref}
            className="absolute top-20 right-4 sm:right-16 z-20 bg-black text-white p-4 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.25)] text-center min-w-[180px]"
          >
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FFE500]">
              ⏳ FLASH SALE ENDING
            </p>
            <p className="text-2xl font-black mt-1 tracking-widest font-mono text-white">
              00:22:41
            </p>
          </div>

          <div
            ref={badge4Ref}
            className="absolute bottom-8 left-4 sm:left-12 z-20 bg-white text-black p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.15)] max-w-[230px] flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-black text-white font-extrabold text-xs flex items-center justify-center shrink-0 border border-neutral-700">
              JD
            </div>
            <div>
              <div className="text-[#FFE500] text-xs font-black">★★★★★</div>
              <p className="text-[11px] font-bold leading-tight mt-0.5">
                "Super premium bass & noise cancellation! 🔥"
              </p>
            </div>
          </div>

          <div
            ref={phoneRef}
            className="relative w-[270px] sm:w-[310px] h-[500px] sm:h-[560px] bg-[#0A0A0C] rounded-[48px] border-[8px] border-[#18181B] shadow-[0_35px_80px_-15px_rgba(0,0,0,0.6)] p-3 flex flex-col justify-between overflow-hidden z-10"
          >
            <div className="w-28 h-4 bg-[#18181B] rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-black border border-neutral-800"></div>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-3 overflow-hidden pt-1">
              <div className="relative bg-gradient-to-b from-[#18181C] to-[#0E0E11] rounded-3xl p-5 flex-1 flex flex-col justify-between border border-neutral-800/80 shadow-inner overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFE500]/10 rounded-full blur-2xl"></div>

                <div className="flex justify-between items-center z-10">
                  <span className="text-[9px] font-black uppercase tracking-wider text-black bg-[#FFE500] px-2.5 py-1 rounded-full border border-black">
                    LIMITED RELEASE
                  </span>
                  <span className="text-[10px] font-bold text-[#FFE500]">
                    ★ 4.9 RATING
                  </span>
                </div>

                <div className="my-auto py-6 text-center z-10 space-y-4">
                  <div className="flex items-center justify-center gap-1.5 h-12">
                    <span className="w-1.5 h-6 bg-[#FFE500] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-10 bg-white rounded-full animate-pulse"></span>
                    <span className="w-1.5 h-12 bg-[#FFE500] rounded-full"></span>
                    <span className="w-1.5 h-8 bg-white rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-5 bg-[#FFE500] rounded-full"></span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">
                      STUDIO SOUND MAX 2
                    </h3>
                    <p className="text-[11px] font-medium text-neutral-400 mt-1">
                      Active Noise Cancellation • 50h Battery
                    </p>
                  </div>
                </div>

                <div className="z-10 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-neutral-400 font-bold uppercase">Special Price</p>
                    <p className="text-lg font-black text-[#FFE500]">$142.00</p>
                  </div>
                  <span className="text-[10px] text-neutral-500 line-through font-bold">
                    $210.00
                  </span>
                </div>
              </div>

              <div className="bg-[#141417] rounded-2xl p-3 border border-neutral-800/80 flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-black uppercase text-white tracking-wider">
                    SPECIAL OFFER
                  </p>
                  <p className="text-[9px] text-neutral-400 font-medium">
                    Claim extra discount coupon
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-[#FFE500] text-black text-[10px] font-black uppercase py-2 px-3 rounded-xl border border-black hover:bg-white transition-colors"
                >
                  35% OFF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED PRODUCTS SECTION --- */}
      <section
        ref={productSectionRef}
        className="py-24 bg-[#ECECEE] text-black rounded-t-[3.5rem] px-4 sm:px-6 lg:px-12 shadow-[0_-15px_40px_rgba(0,0,0,0.04)] relative overflow-hidden border-t border-neutral-300"
      >
        <div className="max-w-7xl mx-auto">
          <div className="section-header text-center mb-16 space-y-3">
            <span className="inline-block text-[11px] uppercase tracking-[0.2em] font-black text-black bg-[#FFE500] px-4 py-1.5 rounded-full shadow-sm border border-black">
              Handpicked Essentials
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black uppercase">
              Featured Masterpieces
            </h2>
            <div className="w-12 h-1 bg-black mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 max-w-7xl mx-auto">
            {products && products.length > 0 ? (
              products.map((product) => {
                const isFavorite = wishlist[product.id];
                return (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct && setSelectedProduct(product)}
                    className="product-card bg-white rounded-[2.2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 border border-neutral-200/90 flex flex-col justify-between group cursor-pointer relative"
                  >
                    <div className="relative h-64 bg-gradient-to-b from-[#1F2026] to-[#111215] p-6 flex items-center justify-center overflow-hidden">
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <span className="text-[9px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full">
                          {product.category || "ESSENTIAL"}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(e, product.id)}
                          className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                            isFavorite
                              ? "bg-red-500 text-white"
                              : "bg-white/15 hover:bg-white/30 text-white"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill={isFavorite ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.293l1.318-1.275a4.5 4.5 0 116.364 6.364L12 21.354l-7.682-7.672a4.5 4.5 0 010-6.364z"
                            />
                          </svg>
                        </button>
                      </div>

                      <img
                        src={
                          product?.thumbnail ||
                          product?.images?.[0] ||
                          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
                        }
                        alt={product.title}
                        className="max-h-48 max-w-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-0"
                      />

                      <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
                        <span className="bg-[#FFE500] text-black text-[10px] font-black uppercase tracking-wider py-1.5 px-4 rounded-full border border-black shadow-md flex items-center gap-1">
                          View Details <span>→</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
                      <div className="space-y-2">
                        <h3 className="font-extrabold text-base text-black tracking-tight line-clamp-1 group-hover:text-neutral-700 transition-colors">
                          {product.title}
                        </h3>

                        <div className="flex items-center gap-2 pt-0.5">
                          <span className="text-[10px] font-black tracking-wider text-black bg-[#FFE500] px-2 py-0.5 rounded border border-black">
                            ★ {product.rating || "4.8"}
                          </span>
                          <span className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase">
                            REF: #{product.id}00
                          </span>
                        </div>

                        <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 font-normal pt-1">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-black tracking-widest text-neutral-400 block uppercase">
                            PRICE
                          </span>
                          <p className="text-2xl font-black text-black tracking-tight">
                            ${product.price}
                          </p>
                        </div>
                        
                        <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-4 text-center py-16">
                <p className="text-neutral-500 font-bold text-base tracking-wider uppercase animate-pulse">
                  Loading featured items...
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FirstSection;