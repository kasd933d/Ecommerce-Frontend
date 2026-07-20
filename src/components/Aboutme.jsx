import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AboutMe() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightGridRef = useRef(null);

  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline with ScrollTrigger for smooth scroll animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // When 75% of viewport reaches section
          toggleActions: "play none none reverse", // Plays on scroll down, reverses on scroll up
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
      )
        .fromTo(
          leftContentRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          rightGridRef.current?.children || [],
          { scale: 0.9, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
          "-=0.5"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-slate-900 py-20 px-6 md:px-16 lg:px-24 border-t border-slate-200 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Title & Accordion Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <h1
              ref={headingRef}
              className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-none"
            >
              WHAT WE DO.
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end w-full">
            <div className="w-full lg:max-w-xs border border-slate-200 bg-slate-50/80 backdrop-blur-md rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion(1)}
                className="w-full px-4 py-3 flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <span>THIS IS US</span>
                <span>{openAccordion === 1 ? "( – )" : "( + )"}</span>
              </button>
              {openAccordion === 1 && (
                <div className="px-4 pb-3 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-2">
                  Dedicated team of creatives and engineers crafting digital products.
                </div>
              )}
            </div>

            <div className="w-full lg:max-w-xs border border-slate-200 bg-slate-50/80 backdrop-blur-md rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion(2)}
                className="w-full px-4 py-3 flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <span>PITCHDECK</span>
                <span>{openAccordion === 2 ? "( – )" : "( + )"}</span>
              </button>
              {openAccordion === 2 && (
                <div className="px-4 pb-3 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-2">
                  Download our official pitchdeck to explore our roadmap and work.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid: Left Text + Right Image Items */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-slate-200 pt-10">
          
          {/* Left Side: Smaller Paragraph Text & Tags */}
          <div ref={leftContentRef} className="lg:col-span-6 space-y-6">
            <p className="text-lg sm:text-2xl font-normal tracking-tight text-slate-700 leading-relaxed">
              We create meaningful brands, design digital experiences that move people and build products that perform. Sharp design, smart code and marketing that drives impact. From first insight to final launch, we bring the brains, the heart and the craft to make it happen.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button className="border border-slate-300 hover:border-slate-900 text-slate-800 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wider flex items-center gap-1.5 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
                BRANDING ↗
              </button>
              <button className="border border-slate-300 hover:border-slate-900 text-slate-800 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wider flex items-center gap-1.5 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
                DIGITAL ↗
              </button>
              <button className="border border-slate-300 hover:border-slate-900 text-slate-800 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wider flex items-center gap-1.5 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
                MARKETING ↗
              </button>
            </div>
          </div>

          {/* Right Side: Small Parallel Showcase Images */}
          <div
            ref={rightGridRef}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            {/* Image Box 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 aspect-video sm:aspect-square shadow-md">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
                alt="Brand Showcase 1"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300">01 / Concept</span>
                <p className="text-xs font-semibold text-white">Brand Architecture</p>
              </div>
            </div>

            {/* Image Box 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 aspect-video sm:aspect-square shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=500&q=80"
                alt="Brand Showcase 2"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300">02 / UI Design</span>
                <p className="text-xs font-semibold text-white">Digital Product UI</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutMe;