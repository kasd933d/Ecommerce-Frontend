import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom"; // 👈 1. useNavigate import kiya
import { useAuth } from "../AuthContext/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate(); // 👈 2. Hook initialize kiya
  const [activeTab, setActiveTab] = useState("overview");

  // GSAP Ref
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [activeTab]);

  // Mock Stats Data
  const stats = [
    { id: 1, title: "Total Revenue", value: "₹4,82,950", change: "+14.2%", isPositive: true },
    { id: 2, title: "Total Orders", value: "1,248", change: "+8.1%", isPositive: true },
    { id: 3, title: "Active Products", value: "86", change: "+4 new", isPositive: true },
    { id: 4, title: "Pending Dispatch", value: "12", change: "-3%", isPositive: false },
  ];

  // Mock Products Data
  const [products, setProducts] = useState([
    { id: 101, name: "AURA Wireless Headphones", category: "Audio", price: "₹12,999", stock: 45, status: "In Stock" },
    { id: 102, name: "AURA Smart Watch Series 5", category: "Wearables", price: "₹24,999", stock: 18, status: "Low Stock" },
    { id: 103, name: "AURA Mechanical Keyboard", category: "Accessories", price: "₹8,499", stock: 0, status: "Out of Stock" },
  ]);

  // Mock Recent Orders
  const orders = [
    { id: "ORD-9901", customer: "Aarav Sharma", product: "Wireless Headphones", amount: "₹12,999", status: "Delivered", date: "Today" },
    { id: "ORD-9902", customer: "Priya Patel", product: "Smart Watch Series 5", amount: "₹24,999", status: "Processing", date: "Today" },
    { id: "ORD-9903", customer: "Rohan Verma", product: "Mechanical Keyboard", amount: "₹8,499", status: "Pending", date: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 pt-24">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-rose-500 uppercase">System Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">AURA.LAB Admin Panel</h1>
          <p className="text-xs sm:text-sm text-slate-400">Welcome back, <span className="text-slate-200 font-semibold">{user?.name || "Admin"}</span></p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900/80 p-1.5 rounded-full border border-slate-800 self-start md:self-auto">
          {["overview", "products", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all duration-300 ${
                activeTab === tab
                  ? "bg-slate-800 text-white shadow-md border border-slate-700"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto space-y-8">
        {/* STATS OVERVIEW CARDS */}
        {(activeTab === "overview" || activeTab === "products" || activeTab === "orders") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all duration-300 shadow-lg"
              >
                <span className="text-xs font-semibold text-slate-400">{stat.title}</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-black text-white">{stat.value}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      stat.isPositive
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* OVERVIEW & PRODUCTS SECTION */}
        {(activeTab === "overview" || activeTab === "products") && (
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Product Inventory</h2>
                <p className="text-xs text-slate-400">Manage store listings and stock levels</p>
              </div>

              {/* 👈 3. Updated Button Click Event */}
              <button
                onClick={() => navigate("/admin/add-product")}
                className="px-4 py-2 bg-[#FFE500] hover:bg-yellow-400 text-slate-950 font-black text-xs rounded-full transition-all duration-300 shadow-md active:scale-95"
              >
                + Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-200">{prod.name}</td>
                      <td className="py-4 px-4 text-slate-400">{prod.category}</td>
                      <td className="py-4 px-4 font-bold text-white">{prod.price}</td>
                      <td className="py-4 px-4 text-slate-300">{prod.stock} units</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            prod.stock > 20
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : prod.stock > 0
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}
                        >
                          {prod.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-medium transition">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RECENT ORDERS SECTION */}
        {(activeTab === "overview" || activeTab === "orders") && (
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white">Recent Orders</h2>
              <p className="text-xs text-slate-400">Track and fulfill customer orders</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-slate-300">{ord.id}</td>
                      <td className="py-4 px-4 text-slate-200">{ord.customer}</td>
                      <td className="py-4 px-4 text-slate-400">{ord.product}</td>
                      <td className="py-4 px-4 font-bold text-white">{ord.amount}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            ord.status === "Delivered"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : ord.status === "Processing"
                              ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-slate-500">{ord.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}