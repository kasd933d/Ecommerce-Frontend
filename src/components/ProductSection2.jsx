import { useEffect, useRef, useState } from "react";
import {  Link } from 'react-router-dom'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function ProductSection2() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products?limit=6");
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // GSAP Animation once async loading finishes
  useEffect(() => {
    if (!loading && products.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cardsRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, products]);

  return (
    <section ref={sectionRef} className="w-full bg-slate-50 py-24 px-6 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-slate-700 text-xs font-semibold tracking-wide">
              <Box size={14} />
              <span>Product Collection</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Proven by People, <br />
              Designed to Perform
            </h2>
          </div>

          <p className="text-slate-500 text-sm md:text-base max-w-md leading-relaxed">
            Backed by a global community of users, our sound gear combines cutting-edge tech with sleek minimalist design—made to stand out.
          </p>
        </div>

    
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 bg-slate-200 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          /* Products Grid (6 Cards fetched via async/await) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Product Image Box */}
                <div className="relative h-64 w-full bg-white p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Rating Tag */}
                  <span className="absolute top-4 left-4 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                    ★ {item.rating?.rate || "4.5"}
                  </span>

                  {/* Quick View Button */}
                  <button className="absolute bottom-4 right-4 bg-slate-900 text-white p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110">
                    <ArrowUpRight size={18} />
                  </button>
                </div>

                {/* Card Info */}
                <div className="p-6 flex items-center justify-between border-t border-slate-100 bg-slate-50/50">
                  <div className="max-w-[70%]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block truncate">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight mt-0.5 truncate">
                      {item.title}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">
                      ${item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
          
        )}
<div className="flex justify-center pt-6">
  <Link
   to="/products/moreproducts"
    className="px-8 py-4 bg-black text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-gray-900 border border-black hover:border-black/50 hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center gap-2 group text-center"
  >
    <span>Buy Products</span>
    <span className="group-hover:translate-x-1 transition-transform duration-200">
      →
    </span>
  </Link>
      </div>
      </div>
    </section>
  );
}

export default ProductSection2;