import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Brand Name Config (Yahan naam change kar saktay ho!)
const BRAND_NAME = "AURA"; // Options: AURA, VORTEX, PULSE, NEXUS

// Clean Footer Links
const footerLinks = [
  {
    title: "Explore",
    links: [`${BRAND_NAME} Pro ANC`, `${BRAND_NAME} Studio Earbuds`, "Limited Editions", "Accessories"],
  },
  {
    title: "Support",
    links: ["Help Center", "Order Tracking", "Warranty & Returns", "Contact Experts"],
  },
  {
    title: "Company",
    links: ["Our Story", "Studio Acoustics Lab", "Careers", "Press Kit"],
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const newsletterRef = useRef(null);
  const linksRef = useRef(null);
  const legalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master timeline triggered by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%", // Starts animation when footer top hits 85% viewport
          toggleActions: "play none none reverse",
        },
      });

      // 1. Newsletter Box Drop
      tl.fromTo(
        newsletterRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // 2. Links Columns Staggered Drop
      tl.fromTo(
        linksRef.current?.children || [],
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // 3. Bottom Legal Bar Drop
      tl.fromTo(
        legalRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
    }, footerRef);

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden relative">
      
      {/* --- RADIAL COLOR GLOWS IN BACKGROUND --- */}
      {/* 1. Red Glow (Top Left) */}
      <div className="absolute top-0 left-10 w-[400px] h-[400px] bg-red-600/20 blur-[130px] rounded-full pointer-events-none" />
      {/* 2. Blue Glow (Center Right) */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />
      {/* 3. Purple Glow (Bottom Left) */}
      <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Dynamic Big Text Branding in background */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.03]">
        <h1 className="text-[22vw] font-black uppercase tracking-tighter text-white leading-none">
          {BRAND_NAME}.
        </h1>
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* TOP SECTION: Newsletter & Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pb-12 border-b border-white/10">
          
          <div ref={newsletterRef} className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase leading-tight">
              Hear The Future.<br /> Subscribe Now.
            </h2>
            <p className="text-gray-400 max-w-md text-sm sm:text-base leading-relaxed">
              Join our list for exclusive drops, acoustics insights, and 15% off your first premium audio purchase.
            </p>
            
            {/* Minimalist Dark Newsletter Input */}
            <form className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="your.email@studio.com"
                className="flex-grow px-5 py-3.5 bg-neutral-900 text-white border border-white/15 rounded-full text-sm placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white outline-none transition"
                required
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-colors shrink-0"
              >
                Join Now →
              </button>
            </form>
          </div>

          <div className="flex justify-end md:justify-center">
            <div className="relative group">
              {/* Radial Glow behind Image */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
              
              <img 
                src="https://images.pexels.com/photos/5269752/pexels-photo-5269752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt={`${BRAND_NAME} Headphones`} 
                className="relative z-10 w-40 h-40 object-cover rounded-full grayscale border-2 border-white/20 p-1 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION: Navigation Links */}
        <div ref={linksRef} className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-8">
          
          {/* Logo & Social Column */}
          <div className="col-span-2 md:col-span-1 space-y-5">
            <h3 className="text-2xl font-black text-white tracking-tighter">{BRAND_NAME}.</h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              Precision audio engineering for modern creators. Experience sound, redefined.
            </p>
            {/* Minimalist Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {[ {icon: 'IG', link: '#'}, {icon: 'TW', link: '#'}, {icon: 'FB', link: '#'} ].map(soc => (
                <a key={soc.icon} href={soc.link} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black text-white hover:bg-white hover:text-black transition-all">
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {footerLinks.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-widest pb-1 border-b border-white/10 inline-block">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-xs text-gray-400 hover:text-white hover:underline transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM SECTION: Legal & Copyright */}
        <div ref={legalRef} className="pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} {BRAND_NAME} Audio Labs. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}