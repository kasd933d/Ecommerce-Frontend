import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function FAQ() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const faqRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
      ).fromTo(
        faqRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);

  // Naye & Unique Keywords & FAQs
  const faqs = [
    {
      question: "What makes your tech accessories unique?",
      answer:
        "Our products combine minimalist aesthetics with high-performance engineering, ensuring long-lasting durability, sleek finishes, and effortless usability.",
    },
    {
      question: "How long does shipping usually take?",
      answer:
        "We process orders within 24 hours. Domestic express shipping takes 2-4 business days, while international delivery typically arrives in 5-8 days.",
    },
    {
      question: "What is your return and exchange policy?",
      answer:
        "We offer a 30-day hassle-free return window. If you are not completely satisfied with your item, you can exchange or return it for a full refund.",
    },
    {
      question: "How can I track my order status?",
      answer:
        "Once your item ships, you will receive an email and SMS notification containing a direct tracking link to monitor your delivery in real-time.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-slate-900 py-24 px-6 md:px-16 lg:px-24 border-t border-slate-100 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Left Side: New Title */}
        <div className="lg:col-span-5 sticky top-24">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-[54px] font-medium tracking-tight text-slate-900 leading-[1.1]"
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* Right Side: Accordion FAQs */}
        <div ref={faqRef} className="lg:col-span-7 flex flex-col w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-slate-200/80 last:border-none overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
              >
                <span className="text-xl sm:text-2xl font-normal tracking-tight text-slate-800 group-hover:text-black transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`text-slate-400 w-6 h-6 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-slate-800" : ""
                  }`}
                />
              </button>

              {/* Expandable Content Box */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100 mb-6"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;