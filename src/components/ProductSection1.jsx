import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ShieldCheck, Zap } from "lucide-react";

// Image import path (apne assets folder ke mutabiq adjust kar lein)
import HeadphonesImg from "../assets/Headphones.png"

gsap.registerPlugin(ScrollTrigger);

function ProductSection1() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-slate-950 font-sans flex items-end"
    >
      {/* Background Hero Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={HeadphonesImg}
          alt="Studio Wireless Headphones"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out hover:scale-100"
        />
        {/* Dark Gradient Overlay for Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Hero Content Overlay */}
      <div
        ref={textRef}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 pb-16 lg:pb-20 space-y-6 text-white"
      >
        {/* Modern Tag Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-amber-400">
          <Zap size={14} className="fill-amber-400" />
          Next-Gen Audio Technology
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase max-w-3xl leading-[1.05]">
          Immersive Studio <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Acoustic Power
          </span>
        </h1>

        {/* Subtitle / Paragraph */}
        <p className="text-slate-300 text-sm sm:text-lg max-w-xl font-normal leading-relaxed">
          Engineered with active noise cancellation and precision-tuned drivers, 
          delivering studio-grade clarity and rich bass for total auditory immersion.
        </p>

        {/* Action Buttons & Features */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button className="bg-white text-slate-900 hover:bg-slate-100 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg hover:scale-105 flex items-center gap-2">
            Explore Features <ArrowUpRight size={18} />
          </button>

          <div className="flex items-center gap-2 px-4 py-3 text-xs font-medium text-slate-300 border border-white/15 rounded-full bg-black/30 backdrop-blur-sm">
            <ShieldCheck size={16} className="text-emerald-400" />
            2-Year Official Warranty Included
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection1;