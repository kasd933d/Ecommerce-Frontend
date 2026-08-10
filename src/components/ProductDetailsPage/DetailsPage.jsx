import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext";
import { useAuth } from "../AuthContext/AuthContext";


export default function ProductDetail() {
  const navigate = useNavigate();
  
  // 👈 2. User status real AuthContext se nikala
  const { user } = useAuth(); 
  
  // 👈 3. Product Context se sirf selectedProduct aur addToCart liya
  const { selectedProduct, addToCart } = useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [likedReviews, setLikedReviews] = useState({});
  const [addedNotice, setAddedNotice] = useState(false); // Success feedback alert

  if (!selectedProduct) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-6 bg-white text-black px-4 font-sans">
        <p className="text-xs font-black tracking-[0.2em] text-neutral-400 uppercase">
          No Product Selected
        </p>
        <Link
          to="/products"
          className="bg-black text-white px-8 py-3.5 text-xs font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all border border-black"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  // Authentication Check on Add To Cart
  const handleAddToCart = (e) => {
    e.preventDefault(); // Page/Form refresh browser default action stop karne ke liye

    if (!user) {
      // Agar user login NAHI hai -> Auth/Login page par bhejo
      navigate("/Auth");
      return;
    }

    // User Logged In hai -> Cart me item add karein
    addToCart({ ...selectedProduct, qty: quantity });

    // Success alert show karo ki item add ho gaya hai
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const toggleReviewLike = (reviewId) => {
    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const productImages = selectedProduct.images || [
    selectedProduct.thumbnail,
    selectedProduct.thumbnail,
    selectedProduct.thumbnail,
  ];

  const mockReviews = [
    {
      id: 1,
      user: "AHMED K.",
      rating: 5,
      date: "12 JUL 2026",
      comment:
        "Bohot hi Zabardast quality hai! Product bilkul picture jaisa hai. Packing bhi bohot achhi thi aur fast delivery mili.",
      images: [selectedProduct.thumbnail, selectedProduct.thumbnail],
      likes: 14,
    },
    {
      id: 2,
      user: "USMAN R.",
      rating: 5,
      date: "28 JUN 2026",
      comment:
        "Value for money! Quality was beyond my expectation. Highly recommended to everyone.",
      images: [selectedProduct.thumbnail],
      likes: 8,
    },
    {
      id: 3,
      user: "SARA M.",
      rating: 4,
      date: "05 JUN 2026",
      comment:
        "Good product overall. Quality is nice, took 3 days to deliver in Karachi.",
      images: [],
      likes: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans py-12 px-4 sm:px-8 lg:px-16 selection:bg-black selection:text-white relative">
      
      {/* SUCCESS TOAST NOTIFICATION (Jab Cart me item add hoga) */}
      {addedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-6 py-4 rounded-xl shadow-2xl border border-neutral-800 flex items-center gap-4 transition-all">
          <span className="text-green-400 font-bold">✓</span>
          <p className="text-xs font-bold uppercase tracking-wider">
            Added {quantity} x "{selectedProduct.title}" to Cart!
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* ================= BREADCRUMB ================= */}
        <nav className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2">
          <Link to="/products" className="hover:text-black transition-colors">
            Products
          </Link>
          <span>/</span>
          <span>{selectedProduct.category || "General"}</span>
          <span>/</span>
          <span className="text-black font-black truncate max-w-[200px]">
            {selectedProduct.title}
          </span>
        </nav>

        {/* ================= MAIN PRODUCT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: GALLERY (7 COLS) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-full aspect-square border border-black p-8 flex items-center justify-center bg-white relative">
              <img
                src={productImages[selectedImage] || selectedProduct.thumbnail}
                alt={selectedProduct.title}
                className="max-h-[85%] w-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 border p-1 bg-white shrink-0 transition-all ${
                    selectedImage === index
                      ? "border-black ring-1 ring-black"
                      : "border-neutral-200 hover:border-black opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS & BUY BOX (5 COLS) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 block">
                {selectedProduct.category || "General"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-wide leading-tight">
                {selectedProduct.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 text-xs pt-2">
                <div className="flex text-black text-xs font-bold tracking-widest">
                  {"★".repeat(5)}
                </div>
                <span className="font-black text-black">4.8</span>
                <span className="text-neutral-400 text-[11px] font-medium tracking-wider">
                  (128 REVIEWS)
                </span>
              </div>
            </div>

            {/* Price Block */}
            <div className="border-y border-neutral-200 py-6 space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-black text-black tracking-tight">
                  Rs. {selectedProduct.price?.toLocaleString()}
                </span>
                {selectedProduct.discountPercentage && (
                  <span className="text-[10px] font-bold uppercase tracking-widest border border-black px-2 py-1">
                    -{Math.round(selectedProduct.discountPercentage)}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
              {selectedProduct.description}
            </p>

            {/* Quantity Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black block">
                Quantity
              </label>
              <div className="inline-flex items-center border border-black">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center font-bold text-black hover:bg-black hover:text-white transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center font-black text-sm text-black">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center font-bold text-black hover:bg-black hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 bg-black text-white hover:bg-neutral-800 text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-[0.99]"
              >
                Add To Cart
              </button>
            </div>

            {/* Shipping Specs */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-black">
              <div>• Standard Shipping (2-4 Days)</div>
              <div>• Cash on Delivery Available</div>
            </div>

          </div>

        </div>

        {/* ================= SPECIFICATIONS SECTION ================= */}
        <div className="border-t border-black pt-12 space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black">
            Product Specifications
          </h2>
          <div className="border border-black p-6 sm:p-8 space-y-4 max-w-4xl text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <p>{selectedProduct.description}</p>
            <ul className="space-y-2 pt-4 border-t border-neutral-200 text-xs font-medium text-black">
              <li className="flex items-center gap-2">
                <span>—</span> 100% Original product sourced directly from verified suppliers.
              </li>
              <li className="flex items-center gap-2">
                <span>—</span> Inspected for high performance and quality before dispatch.
              </li>
              <li className="flex items-center gap-2">
                <span>—</span> Includes standard brand warranty & quick support service.
              </li>
            </ul>
          </div>
        </div>

        {/* ================= RATINGS & REVIEWS SECTION ================= */}
        <div className="border-t border-black pt-12 space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="space-y-1">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Customer Reviews
              </h2>
              <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                Real feedback from verified purchasers
              </p>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-black">4.8</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">/ 5.0 Rating</span>
            </div>
          </div>

          {/* Rating Summary Bar */}
          <div className="border border-black p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 text-center md:text-left space-y-1">
              <div className="text-black text-sm font-bold tracking-widest">★★★★★</div>
              <p className="text-xs font-bold text-black uppercase tracking-wider">
                95% Customer Recommendation
              </p>
            </div>

            <div className="md:col-span-8 space-y-2 text-xs font-bold text-black">
              {[
                { star: "5 STAR", pct: "85%", count: 108 },
                { star: "4 STAR", pct: "10%", count: 12 },
                { star: "3 STAR", pct: "3%", count: 5 },
                { star: "2 STAR", pct: "1%", count: 2 },
                { star: "1 STAR", pct: "1%", count: 1 },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-16 text-[10px] tracking-wider">{row.star}</span>
                  <div className="flex-1 h-1.5 bg-neutral-100 overflow-hidden border border-black">
                    <div className="h-full bg-black" style={{ width: row.pct }}></div>
                  </div>
                  <span className="w-8 text-right text-[11px] font-mono">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews List */}
          <div className="divide-y divide-neutral-200">
            {mockReviews.map((review) => {
              const isLiked = likedReviews[review.id];
              return (
                <div key={review.id} className="py-8 space-y-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-black text-xs tracking-wider">{review.user}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest border border-black px-2 py-0.5">
                        Verified Purchase
                      </span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-neutral-400">{review.date}</span>
                  </div>

                  <div className="text-black text-xs font-bold tracking-widest">{"★".repeat(review.rating)}</div>

                  <p className="text-neutral-700 leading-relaxed text-xs sm:text-sm font-normal max-w-3xl">
                    {review.comment}
                  </p>

                  {/* Review Images */}
                  {review.images.length > 0 && (
                    <div className="flex items-center gap-3 pt-2">
                      {review.images.map((img, idx) => (
                        <div key={idx} className="w-16 h-16 border border-black p-1">
                          <img src={img} alt="review-pic" className="w-full h-full object-contain" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => toggleReviewLike(review.id)}
                      className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 border transition-all flex items-center gap-2 ${
                        isLiked
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-black hover:bg-neutral-100"
                      }`}
                    >
                      <span>Helpful</span>
                      <span>({review.likes + (isLiked ? 1 : 0)})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}