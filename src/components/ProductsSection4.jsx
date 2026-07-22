import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// High-converting service perks tailored for high-end headphones
const servicesData = [
  {
    id: 1,
    title: "24/7 Dedicated Support",
    description: "Expert audio assistance available round-the-clock for setups, specs, and warranty.",
    icon: (
      <svg className="w-6 h-6 stroke-black fill-none stroke-[1.8]" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5zm18 0a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Fast Express Shipping",
    description: "Enjoy complimentary priority dispatch on all orders over $100 with live tracking.",
    icon: (
      <svg className="w-6 h-6 stroke-black fill-none stroke-[1.8]" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Encrypted Secure Payment",
    description: "100% safe transactions backed by military-grade SSL checkout protection.",
    icon: (
      <svg className="w-6 h-6 stroke-black fill-none stroke-[1.8]" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function ProductFeaturesSection() {
  const sectionRef = useRef(null);
  const topFeaturesRef = useRef(null);
  const bottomServicesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. TOP CARDS SCROLL ANIMATION
      gsap.fromTo(
        topFeaturesRef.current?.children || [],
        { y: -70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: topFeaturesRef.current,
            start: "top 80%", // Animates when top of section hits 80% viewport
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. BOTTOM SERVICES SCROLL ANIMATION
      gsap.fromTo(
        bottomServicesRef.current?.children || [],
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomServicesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, []);

  return (
    <section ref={sectionRef} className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* TOP SECTION: Product Detail Cards */}
        <div ref={topFeaturesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Main Headphone Image Box */}
          <div className="relative group overflow-hidden rounded-3xl bg-gray-100 border border-black/10 min-h-[280px] flex items-end p-6">
            <img
              src="https://images.pexels.com/photos/5269752/pexels-photo-5269752.jpeg"
              alt="Studio Headphones"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Pill Overlay */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-black/10 shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-black">
                High-Fidelity Studio Sound
              </span>
            </div>
          </div>

          {/* Card 2: Feature Detail 01 */}
          <div className="bg-gray-50 border border-black/10 p-8 rounded-3xl flex flex-col justify-between hover:border-black transition-all duration-300">
            <span className="text-xs font-black tracking-widest text-gray-400 uppercase">
              01 / Endurance
            </span>
            <div className="space-y-3 mt-8">
              <h3 className="text-xl font-bold uppercase tracking-tight text-black">
                40-Hour Battery Life
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Enjoy days of nonstop playback on a single charge with ultra-fast USB-C quick refueling.
              </p>
            </div>
          </div>

          {/* Card 3: Feature Detail 02 */}
          <div className="bg-gray-50 border border-black/10 p-8 rounded-3xl flex flex-col justify-between hover:border-black transition-all duration-300">
            <span className="text-xs font-black tracking-widest text-gray-400 uppercase">
              02 / Comfort & ANC
            </span>
            <div className="space-y-3 mt-8">
              <h3 className="text-xl font-bold uppercase tracking-tight text-black">
                Ergonomic & Portable
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Plush memory foam cushions paired with active noise isolation built for all-day listening comfort.
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: E-Commerce Store Services */}
        <div className="pt-12 border-t border-black/10">
          <div
            ref={bottomServicesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-gray-50"
              >
                <div className="p-3 bg-gray-100 rounded-2xl border border-black/10 shrink-0">
                  {service.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-black uppercase tracking-tight">
                    {service.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}