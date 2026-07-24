import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProductContext } from "./ProductContext";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const FirstSection = () => {
  const titleRef = useRef(null);
  const heroRef = useRef(null);
  const phoneRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const badge3Ref = useRef(null);
  const badge4Ref = useRef(null);
  const productSectionRef = useRef(null);

  const { addToCart, setSelectedProduct } = useProductContext();
  const [products, setProducts] = useState([]);

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

  // GSAP Floating & Hero Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Title & Phone Entrance
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

      // Floating Badges Continuous Animation
      gsap.to([badge1Ref.current, badge3Ref.current], {
        y: "-=10",
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.easeInOut",
      });

      gsap.to([badge2Ref.current, badge4Ref.current], {
        y: "+=12",
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.easeInOut",
      });

      // Scroll Animation
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

  return (
    <div className="w-full min-h-screen bg-[#F7F7F5] text-black font-sans overflow-x-hidden">
      {/* --- HERO SECTION WITH IMAGE DESIGN MATCH --- */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-8 select-none"
      >
        {/* Giant Watermark Background Text */}
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

        {/* Center Canvas with Floating Elements */}
        <div className="relative z-10 w-full max-w-5xl h-[520px] sm:h-[600px] flex items-center justify-center">
          
          {/* FLOATING BADGE 1: Yellow Selling Fast (Top Left) */}
          <div
            ref={badge1Ref}
            className="absolute top-4 left-2 sm:left-12 z-20 bg-[#FFFF00] text-black p-4 rounded-2xl shadow-xl border-2 border-black max-w-[180px] sm:max-w-[210px]"
          >
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-tight leading-none mb-1">
              SELLING FAST
            </p>
            <p className="text-[11px] sm:text-xs font-semibold opacity-90">
              ⚡ Only 5 left in stock!
            </p>
          </div>

          {/* FLOATING BADGE 2: Purple Free Shipping (Bottom Right) */}
          <div
            ref={badge2Ref}
            className="absolute bottom-6 right-2 sm:right-12 z-20 bg-[#C49BFF] text-black p-4 rounded-2xl shadow-xl border-2 border-black max-w-[200px]"
          >
            <p className="text-xs sm:text-sm font-extrabold flex items-center gap-1.5">
              🚚 Free shipping!!!*
            </p>
            <p className="text-[10px] sm:text-[11px] font-medium mt-1">
              *When you order through app
            </p>
          </div>

          {/* FLOATING BADGE 3: Yellow Countdown Timer (Middle Right) */}
          <div
            ref={badge3Ref}
            className="absolute top-24 right-4 sm:right-20 z-20 bg-[#FFFF00] text-black p-4 rounded-2xl shadow-xl border-2 border-black text-center min-w-[170px]"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider">
              ⏳ Discount Ending...
            </p>
            <p className="text-xl sm:text-2xl font-black mt-1 tracking-wider">
              00:22:41
            </p>
          </div>

          {/* FLOATING BADGE 4: White Review Box (Bottom Left) */}
          <div
            ref={badge4Ref}
            className="absolute bottom-10 left-4 sm:left-16 z-20 bg-white text-black p-3.5 rounded-2xl shadow-xl border-2 border-black max-w-[220px] flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
              JD
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">
                "So worth the money! Premium Bass 🔥"
              </p>
            </div>
          </div>

          {/* CENTER PHONE CONTAINER (Your Headphones Here) */}
          <div
            ref={phoneRef}
            className="relative w-[260px] sm:w-[290px] h-[480px] sm:h-[530px] bg-slate-950 rounded-[42px] border-[6px] border-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] p-3 flex flex-col justify-between overflow-hidden z-10"
          >
            {/* Phone Top Speaker Notch */}
            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2 shrink-0"></div>

            {/* Main Headphones Image Card Inside Phone */}
            <div className="bg-slate-900 rounded-2xl p-3 h-[60%] flex flex-col items-center justify-center relative overflow-hidden border border-slate-800">
              <span className="absolute top-2 left-2 text-[9px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full uppercase border border-amber-400/20">
                Super Sale Today
              </span>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                alt="Headphones"
                className="w-full h-36 object-contain hover:scale-110 transition-transform duration-500 mt-2"
              />
              <div className="text-left w-full mt-2">
                <p className="text-xs font-bold text-white leading-tight">
                  Wireless Studio Headphones
                </p>
                <p className="text-[11px] font-extrabold text-amber-400 mt-0.5">
                  $142.00
                </p>
              </div>
            </div>

            {/* Special Wheel/Discount Box Inside Phone */}
            <div className="bg-slate-900 rounded-2xl p-3 h-[34%] flex flex-col justify-between border border-slate-800">
              <p className="text-[10px] font-extrabold uppercase text-slate-400 text-center">
                Special deal just for you
              </p>
              <div className="flex items-center justify-around bg-slate-950 p-2 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#FFFF00] text-black font-extrabold text-[10px] flex items-center justify-center border border-black">
                  35% OFF
                </div>
                <div className="w-10 h-10 rounded-full bg-[#C49BFF] text-black font-extrabold text-[10px] flex items-center justify-center border border-black">
                  20% OFF
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- FEATURED PRODUCTS SECTION --- */}
      <section
        ref={productSectionRef}
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 120%, #FFF37A 0%, #FFC700 45%, #C27A00 85%, #824D00 100%)",
        }}
        className="py-24 text-slate-900 rounded-t-[3.5rem] px-4 sm:px-6 lg:px-12 shadow-2xl relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="section-header text-center mb-16 space-y-3">
            <span className="inline-block text-[11px] uppercase tracking-[0.2em] font-bold text-amber-950 bg-white/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/50 shadow-sm">
              Handpicked Essentials
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Featured Masterpieces
            </h2>
            <div className="w-12 h-1 bg-slate-950/80 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {products && products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct && setSelectedProduct(product)}
                  className="product-card bg-white/95 backdrop-blur-md rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/60 group cursor-pointer"
                >
                  <div className="w-full sm:w-[42%] h-48 bg-slate-50/80 rounded-2xl flex items-center justify-center p-4 relative shrink-0 overflow-hidden border border-slate-100">
                    <img
                      src={
                        product?.thumbnail ||
                        product?.images?.[0] ||
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
                      }
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="w-full sm:w-[58%] flex flex-col justify-between h-full space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                          REF: {product.id}00
                        </span>
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60 flex items-center gap-1">
                          ★ {product.rating || "4.8"}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-slate-900 leading-snug line-clamp-2">
                        {product.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 font-medium">
                        {product.description ||
                          "Premium build quality & ergonomic minimal aesthetics."}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Price
                        </span>
                        <p className="text-xl sm:text-2xl font-black text-slate-950">
                          ${product.price}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart && addToCart(product);
                        }}
                        className="bg-slate-950 hover:bg-black text-white text-xs font-black uppercase tracking-wider py-3 px-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 active:scale-95"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-slate-950 font-bold text-base">
                  Loading products context data...
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