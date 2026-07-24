import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductContext";

export default function ProductDetail() {
  const { selectedProduct, addToCart } = useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [likedReviews, setLikedReviews] = useState({});

  if (!selectedProduct) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-3 bg-gray-100">
        <p className="text-sm font-semibold text-gray-600">No product selected.</p>
        <Link
          to="/products"
          className="bg-orange-500 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...selectedProduct, qty: quantity });
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
      user: "Ahmed K.",
      rating: 5,
      date: "12 Jul 2026",
      comment: "Bohot hi Zabardast quality hai! Product bilkul picture jaisa hai. Packing bhi bohot achhi thi aur fast delivery mili.",
      images: [selectedProduct.thumbnail, selectedProduct.thumbnail],
      likes: 14,
    },
    {
      id: 2,
      user: "Usman R.",
      rating: 5,
      date: "28 Jun 2026",
      comment: "Value for money! Quality was beyond my expectation. Highly recommended to everyone.",
      images: [selectedProduct.thumbnail],
      likes: 8,
    },
    {
      id: 3,
      user: "Sara M.",
      rating: 4,
      date: "05 Jun 2026",
      comment: "Good product overall. Quality is nice, took 3 days to deliver in Karachi.",
      images: [],
      likes: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-[#eff0f5] text-gray-800 text-xs py-4 px-2 sm:px-4 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-3">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[11px] text-gray-500 flex items-center gap-1.5 px-1">
          <Link to="/products" className="hover:text-orange-600">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-400 capitalize">{selectedProduct.category || "General"}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate max-w-[200px]">
            {selectedProduct.title}
          </span>
        </div>

        {/* ================= MAIN PRODUCT BLOCK ================= */}
        <div className="bg-white rounded border border-gray-200 shadow-sm p-4 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* LEFT: GALLERY (5 Cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="w-full aspect-square border border-gray-200 rounded p-2 flex items-center justify-center bg-white">
              <img
                src={productImages[selectedImage] || selectedProduct.thumbnail}
                alt={selectedProduct.title}
                className="max-h-72 w-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-12 h-12 rounded border p-0.5 bg-white shrink-0 ${
                    selectedImage === index
                      ? "border-orange-500 shadow-sm"
                      : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* MIDDLE: INFO & BUY BOX (4 Cols) */}
          <div className="md:col-span-4 space-y-4 border-b md:border-b-0 md:border-r border-gray-100 pr-0 md:pr-4">
            <div>
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded">
                {selectedProduct.category || "General"}
              </span>
              <h1 className="text-base font-normal text-gray-900 mt-1.5 leading-snug">
                {selectedProduct.title}
              </h1>
            </div>

            {/* Rating Overview */}
            <div className="flex items-center gap-2 text-[11px] border-b border-gray-100 pb-3">
              <div className="flex text-amber-400">★★★★★</div>
              <span className="font-semibold text-gray-800">4.8</span>
              <span className="text-gray-400">| 128 Ratings</span>
            </div>

            {/* Price Box */}
            <div className="bg-gray-50 p-3 rounded space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-orange-600">
                  Rs. {selectedProduct.price?.toLocaleString()}
                </span>
                {selectedProduct.discountPercentage && (
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                    -{Math.round(selectedProduct.discountPercentage)}%
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 leading-relaxed text-[11px] line-clamp-3">
              {selectedProduct.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-gray-500 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 bg-gray-50 hover:bg-gray-200"
                >
                  −
                </button>
                <span className="w-10 text-center font-semibold text-gray-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 bg-gray-50 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add To Cart Action */}
            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded uppercase tracking-wider text-xs transition shadow-sm active:scale-98"
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* RIGHT: DELIVERY & SELLER DETAILS (3 Cols) */}
          <div className="md:col-span-3 space-y-4 text-[11px]">
            {/* Delivery */}
            <div className="space-y-2 border-b border-gray-100 pb-3">
              <div className="text-gray-400 uppercase font-bold text-[10px] tracking-wider">
                Delivery Options
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400">📍</span>
                <div>
                  <div className="font-semibold text-gray-800">Standard Delivery</div>
                  <div className="text-gray-500">2 - 4 business days</div>
                  <div className="font-bold text-gray-900 mt-0.5">Rs. 145</div>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <span className="text-gray-400">💵</span>
                <div>
                  <div className="font-semibold text-gray-800">Cash on Delivery</div>
                  <div className="text-gray-500">Available</div>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="space-y-2">
              <div className="text-gray-400 uppercase font-bold text-[10px] tracking-wider">
                Service & Seller
              </div>
              <div>
                <div className="font-bold text-gray-900">Official Retail Store</div>
                <div className="text-emerald-600 text-[10px] font-semibold">✓ Verified Seller</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                  <span className="font-bold text-gray-800 block text-xs">96%</span>
                  <span className="text-[9px] text-gray-400 uppercase">Positive</span>
                </div>
                <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                  <span className="font-bold text-gray-800 block text-xs">99%</span>
                  <span className="text-[9px] text-gray-400 uppercase">Ship Rate</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ================= PRODUCT DESCRIPTION SECTION ================= */}
        <div className="bg-white rounded border border-gray-200 p-4 space-y-2">
          <h2 className="text-xs font-bold text-gray-900 uppercase border-b border-gray-100 pb-2">
            Product details of {selectedProduct.title}
          </h2>
          <div className="text-gray-600 text-[11px] leading-relaxed pt-1">
            <p>{selectedProduct.description}</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
              <li>100% Original product delivered directly from authorized suppliers.</li>
              <li>Tested for quality assurance before dispatch.</li>
              <li>Includes standard warranty as per manufacturer terms.</li>
            </ul>
          </div>
        </div>

        {/* ================= RATINGS & REVIEWS SECTION ================= */}
        <div className="bg-white rounded border border-gray-200 p-4 space-y-4">
          <h2 className="text-xs font-bold text-gray-900 uppercase border-b border-gray-100 pb-2">
            Ratings & Reviews
          </h2>

          {/* Rating Summary Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-gray-50 p-4 rounded border border-gray-100">
            <div className="text-center sm:border-r border-gray-200 pr-0 sm:pr-6 space-y-1">
              <span className="text-3xl font-bold text-gray-900 block">4.8</span>
              <div className="text-amber-400 text-sm">★★★★★</div>
              <span className="text-[10px] text-gray-400 block">128 Ratings</span>
            </div>

            <div className="flex-1 space-y-1.5 w-full text-[11px] font-medium text-gray-500">
              {[
                { star: "5 Star", pct: "85%", count: 108 },
                { star: "4 Star", pct: "10%", count: 12 },
                { star: "3 Star", pct: "3%", count: 5 },
                { star: "2 Star", pct: "1%", count: 2 },
                { star: "1 Star", pct: "1%", count: 1 },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-10">{row.star}</span>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded overflow-hidden">
                    <div className="h-full bg-amber-400 rounded" style={{ width: row.pct }}></div>
                  </div>
                  <span className="w-6 text-right text-gray-400">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews List */}
          <div className="space-y-4 pt-2">
            {mockReviews.map((review) => {
              const isLiked = likedReviews[review.id];
              return (
                <div key={review.id} className="border-b border-gray-100 pb-4 space-y-1.5 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800 text-xs">{review.user}</span>
                      <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-medium border border-emerald-100">
                        Verified Purchase
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400">{review.date}</span>
                  </div>

                  <div className="text-amber-400 text-[10px]">{"★".repeat(review.rating)}</div>

                  <p className="text-gray-700 leading-relaxed text-[11px]">{review.comment}</p>

                  {/* Review Images */}
                  {review.images.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1">
                      {review.images.map((img, idx) => (
                        <div key={idx} className="w-12 h-12 bg-gray-50 border border-gray-200 rounded p-0.5 overflow-hidden">
                          <img src={img} alt="review-pic" className="w-full h-full object-contain" />
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => toggleReviewLike(review.id)}
                    className={`text-[10px] font-semibold px-2 py-1 rounded border transition flex items-center gap-1 w-max ${
                      isLiked
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    👍 Helpful ({review.likes + (isLiked ? 1 : 0)})
                  </button>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}