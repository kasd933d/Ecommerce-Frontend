import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProductContext } from "./ProductContext"; // ✅ Fixed Import

gsap.registerPlugin(ScrollTrigger);

const FirstSection = () => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const imageRef = useRef(null);
  const productSectionRef = useRef(null);

  // Context Hooks
  const { addToCart, setSelectedProduct } = useProductContext();

  // Local state for featured products if fetching directly
  const [products, setProducts] = useState([]);

  // Fetch Featured Products (Top 4 Items)
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=4");
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
        }
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

      // 1. HERO SECTION ANIMATION
      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          btnRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          imageRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );

      // 2. SCROLL ANIMATION
      if (productSectionRef.current) {
        gsap.fromTo(
          ".section-header",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: productSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          ".product-card",
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: productSectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [products]); // Trigger animation refresh when products load

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col justify-center items-start space-y-6 text-left">
            <div ref={titleRef} className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                2026 Next-Gen Collection
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900">
                Minimal Design, <br />
                <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent">
                  Maximum Impact.
                </span>
              </h1>
            </div>

            <p ref={descRef} className="text-slate-600 text-base sm:text-lg max-w-lg leading-relaxed">
              Discover precision-crafted technology and lifestyle products designed to seamlessly fit your modern daily workflow.
            </p>

            <div ref={btnRef} className="flex flex-wrap items-center gap-4 pt-2">
              <button className="bg-slate-900 hover:bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-slate-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                Explore Store
              </button>
              <button className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 px-8 py-3.5 rounded-full text-sm font-semibold shadow-sm transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          <div ref={imageRef} className="flex justify-center items-center w-full">
            <div className="relative w-full max-w-[460px] aspect-square rounded-[2.5rem] bg-white border border-slate-200/80 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex items-center justify-center overflow-hidden">
              <div className="absolute w-64 h-64 bg-slate-100 rounded-full blur-2xl -z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                alt="Hero Product"
                className="w-full h-full object-cover rounded-[2rem] shadow-sm hover:scale-105 transition-transform duration-500 relative z-10"
              />
              <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md border border-slate-200 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-3">
                <span className="text-xl">★</span>
                <div>
                  <p className="text-xs font-bold text-slate-900">4.9 / 5.0 Rating</p>
                  <p className="text-[10px] text-slate-500">From 2,500+ Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section 
        ref={productSectionRef} 
        className="py-20 bg-[#F1F5F9] text-[#0F172B] rounded-t-[3rem] px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="section-header text-center mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-slate-400 bg-slate-800 px-4 py-1.5 rounded-full">
              Handpicked Essentials
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Featured Masterpieces
            </h2>
            <div className="w-16 h-1 bg-slate-700 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {products && products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="product-card bg-white text-slate-900 rounded-[24px] p-5 flex flex-col sm:flex-row items-center gap-5 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100"
                >
                  <div className="w-full sm:w-[45%] h-44 bg-slate-100 rounded-[18px] flex items-center justify-center p-4 relative shrink-0 overflow-hidden">
                    <img
                      src={
                        product?.thumbnail ||
                        product?.images?.[0] ||
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
                      }
                      alt={product.title}
                      className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
                    />
                    <button className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm text-xs text-rose-500 transition-colors">
                      ❤️
                    </button>
                  </div>

                  <div className="w-full sm:w-[55%] flex flex-col justify-between h-full space-y-3">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          REF: {product.id}00
                        </span>
                        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                          ★ {product.rating}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-2 mt-1">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {product.description || "Premium build quality & ergonomic minimal aesthetics."}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-3">
                      <p className="text-2xl font-black text-slate-900">
                        ${product.price}
                      </p>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-md transition-all duration-300 hover:scale-105"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center col-span-2 text-base py-12">
                Loading products context data...
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FirstSection;