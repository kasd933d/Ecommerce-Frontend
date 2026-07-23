import React, { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProductContext } from "../ProductContext";

// Initial State Definition
const initialState = {
  products: [],
  filteredProducts: [],
  loading: true,
  error: "",
  searchQuery: "",
  selectedCategory: "all",
  sortBy: "default",
};

// Reducer Function
function productsReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: "" };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload,
        filteredProducts: action.payload,
      };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };

    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };

    case "SET_SORT":
      return { ...state, sortBy: action.payload };

    case "APPLY_FILTERS": {
      let temp = [...state.products];

      // Search Query
      if (state.searchQuery.trim()) {
        temp = temp.filter((p) =>
          p.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }

      // Category Filter
      if (state.selectedCategory !== "all") {
        temp = temp.filter((p) => p.category === state.selectedCategory);
      }

      // Price Sort
      if (state.sortBy === "lowToHigh") {
        temp.sort((a, b) => a.price - b.price);
      } else if (state.sortBy === "highToLow") {
        temp.sort((a, b) => b.price - a.price);
      }

      return { ...state, filteredProducts: temp };
    }

    default:
      return state;
  }
}

export default function MoreProducts() {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  
  // Custom context hook created in ProductContext.jsx
  const { setSelectedProduct } = useProductContext();
  const navigate = useNavigate();

  // Fetch Public Dummy API Products
  useEffect(() => {
    const fetchCatalog = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await fetch("https://dummyjson.com/products?limit=28");
        const data = await res.json();

        if (res.ok) {
          dispatch({ type: "FETCH_SUCCESS", payload: data.products });
        } else {
          dispatch({ type: "FETCH_ERROR", payload: "Failed to load products." });
        }
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: "Network Connection Error!" });
      }
    };

    fetchCatalog();
  }, []);

  // Filter effect
  useEffect(() => {
    dispatch({ type: "APPLY_FILTERS" });
  }, [state.searchQuery, state.selectedCategory, state.sortBy]);

  // Handle Item Card Click (Daraz Style Flow)
  const handleCardClick = (product) => {
    setSelectedProduct(product);
    navigate(`/product/${product.id}`);
  };

  // Unique categories list
  const categories = [
    "all",
    ...new Set(state.products.map((p) => p.category)),
  ];

  return (
    <div className="bg-white text-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* BREADCRUMB & HEADER */}
        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-400">
          <Link
            to="/home"
            className="hover:text-black transition flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Back To Home
          </Link>
          <span>Catalog / More Products</span>
        </div>

        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-3 py-1 rounded-full">
              Full Catalog
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black mt-3">
              More Products
            </h1>
            <p className="text-xs text-gray-500 mt-2 max-w-md">
              Click on any item to view full details and add to cart.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase">
              Showing:
            </span>
            <span className="text-sm font-black bg-gray-100 border border-black/10 px-4 py-2 rounded-xl">
              {state.filteredProducts.length} Items
            </span>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-gray-50 p-4 border border-black/10 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <input
              type="text"
              placeholder="Search products..."
              value={state.searchQuery}
              onChange={(e) =>
                dispatch({ type: "SET_SEARCH", payload: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border border-black/15 rounded-xl text-sm outline-none focus:border-black transition"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={state.selectedCategory}
              onChange={(e) =>
                dispatch({ type: "SET_CATEGORY", payload: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border border-black/15 rounded-xl text-sm outline-none focus:border-black capitalize transition"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={state.sortBy}
              onChange={(e) =>
                dispatch({ type: "SET_SORT", payload: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border border-black/15 rounded-xl text-sm outline-none focus:border-black transition"
            >
              <option value="default">Sort: Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {state.loading ? (
          <div className="text-center py-24 text-gray-400 font-bold tracking-widest uppercase text-xs">
            Loading Catalog Items...
          </div>
        ) : state.error ? (
          <div className="p-4 bg-red-50 text-red-600 text-center rounded-xl text-sm border border-red-200">
            {state.error}
          </div>
        ) : state.filteredProducts.length === 0 ? (
          <div className="text-center py-24 text-gray-400 text-sm font-medium">
            No products match your search/filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {state.filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleCardClick(product)}
                className="group cursor-pointer bg-gray-50 border border-black/10 rounded-2xl p-4 flex flex-col justify-between hover:border-black hover:shadow-2xl transition-all duration-300"
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-4 border border-black/5">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 text-[11px] font-black bg-black text-white px-2.5 py-0.5 rounded-full">
                    ${product.price}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-bold text-black truncate group-hover:underline">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Arrow Hint instead of direct Add To Cart button */}
                <div className="mt-4 pt-3 border-t border-black/5 flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-gray-400 group-hover:text-black transition">
                    View Details
                  </span>
                  <span className="text-sm font-black group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}