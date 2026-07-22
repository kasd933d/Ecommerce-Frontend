import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// Clean Black & White Customer Reviews Data with explicit Glow Colors
const reviewsData = [
  {
    id: 1,
    name: "Ayesha Khan",
    role: "Verified Buyer",
    rating: 5,
    title: "Unreal Sound Quality!",
    comment:
      "The clarity on these acoustic drivers is insane. The bass hits deep without muddying the vocals. Best purchase I've made all year!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    purchasedProduct: "Sonic Pro Wireless",
    // Glow Color for this card
    glowColor: "from-red-600/30",
  },
  {
    id: 2,
    name: "Jordan Smith",
    role: "Verified Buyer",
    rating: 5,
    title: "Battery Life Is Exceptional",
    comment:
      "Used it on a 3-day road trip without charging once. Zero distortion at max volume, super reliable hardware!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    purchasedProduct: "Sonic Boom Speaker",
    glowColor: "from-blue-600/30",
  },
  {
    id: 3,
    name: "Hamza Ali",
    role: "Verified Buyer",
    rating: 5,
    title: "Sleek Design & Daily Workhorse",
    comment:
      "Looks stunning on my desk setup and switches seamlessly between my laptop and smartphone. Absolutely top-tier build.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    purchasedProduct: "Sonic Studio Earbuds",
    glowColor: "from-yellow-600/30",
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Verified Buyer",
    rating: 5,
    title: "Compact Yet Mind-Blowing",
    comment:
      "Super portable, fits right in my backpack. Perfect for outdoor hangs and casual workouts. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    purchasedProduct: "Sonic Mini Pod",
    glowColor: "from-purple-600/30",
  },
];

export default function ProductSection3() {
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Header Drop Animation
    gsap.fromTo(
      headerRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Review Cards Staggered Drop Animation
    gsap.fromTo(
      cardsRef.current,
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    <section className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Section (Upper Drop Ref) */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8"
        >
          <div className="space-y-4">
            {/* Minimalist Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-semibold tracking-wider uppercase rounded-full">
              <span>★ 4.9 / 5.0 Rating</span>
              <span>•</span>
              <span>10k+ Customers</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black uppercase">
              What Our Customers <br className="hidden sm:inline" />
              Are Saying
            </h2>
          </div>

          <p className="text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
            From music lovers to daily users, everyone is talking about Sonic. See what they have to say.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviewsData.map((review, index) => (
            <div
              key={review.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative group overflow-hidden bg-gray-50 border border-black/10 p-6 sm:p-8 rounded-3xl transition-all duration-300 ease-in-out hover:border-black/30 hover:shadow-2xl hover:shadow-black/5"
            >
              {/* --- RADIAL GLOW LAYER --- */}
              {/* This absolute div creates the colored radial gradient behind the content */}
              <div
                className={`absolute inset-0 z-0 bg-radial bg-gradient-to-br ${review.glowColor} to-transparent blur-[80px] opacity-10 transition-opacity duration-300 group-hover:opacity-30`}
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%' }}
              />
              
              {/* --- CARD CONTENT LAYER --- */}
              {/* Need to set z-10 so content is above the glow */}
              <div className="relative z-10 flex flex-col justify-between space-y-6 h-full">
                <div className="space-y-4">
                  {/* Black Stars */}
                  <div className="flex items-center gap-1 text-black">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review Headline & Body */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-black transition-colors duration-200 group-hover:text-gray-900">
                      "{review.title}"
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed transition-colors duration-200 group-hover:text-black">
                      {review.comment}
                    </p>
                  </div>
                </div>

                {/* User Profile Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-black/10 transition-colors duration-300 group-hover:border-black/30">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border border-black/20"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-black">
                          {review.name}
                        </span>
                        {/* Black Verified Check */}
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-black text-white text-[9px]">
                          ✓
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 block">
                        {review.role}
                      </span>
                    </div>
                  </div>

                  {/* Product Tag */}
                  <span className="text-[11px] font-medium text-black bg-gray-200 px-2.5 py-1 rounded-md hidden sm:inline-block transition-colors duration-300 group-hover:bg-gray-300">
                    {review.purchasedProduct}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}