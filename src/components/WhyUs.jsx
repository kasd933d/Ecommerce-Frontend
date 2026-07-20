import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Zap, HeartHandshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function WhyUs() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Badge & Header Animations
      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      )
        .fromTo(
          headerRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
          "-=0.3"
        )
        // Cards Stagger Animation
        .fromTo(
          cardsRef.current?.children || [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
          "-=0.4"
        );
    });

    return () => ctx.revert();
  }, []);

  const features = [
    {
      id: 1,
      icon: ShieldCheck,
      title: "2-Year Warranty",
      desc: "Every product is built with military-grade precision and backed by complete coverage.",
    },
    {
      id: 2,
      icon: Zap,
      title: "Ultra-Fast Delivery",
      desc: "Instant order processing with guaranteed express shipping straight to your doorstep.",
    },
    {
      id: 3,
      icon: HeartHandshake,
      title: "24/7 Dedicated Support",
      desc: "Our expert tech assistance team is always ready to resolve your queries around the clock.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-slate-900 py-24 px-6 md:px-16 lg:px-24 border-t border-slate-100 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Badge Section */}
        <div>
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] font-bold uppercase tracking-widest text-slate-600 shadow-2xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
            Why Us
          </span>
        </div>

        {/* Header Grid */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-between"
        >
          {/* Main Title Left */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Crafted for Perfection
          </h2>

          {/* Subtitle / Paragraph Right */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed md:max-w-md md:ml-auto">
            We prioritize durability, seamless design, and exceptional customer service to deliver an unmatched product experience.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4"
        >
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#F8FAFC] border border-slate-100/80 rounded-[28px] p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-2xs">
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                {/* Card Text Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WhyUs;