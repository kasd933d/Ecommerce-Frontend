import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProductContext } from "../ProductContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useProductContext();
  const navigate = useNavigate();

  // Selection states
  const [selectedItems, setSelectedItems] = useState([]);
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Toggle select individual item
  const toggleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Toggle select all items
  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  // Calculate Subtotal for SELECTED items only
  const subtotal = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  const shippingFee = subtotal > 0 ? 150 : 0; // Flat PKR 150 or Free
  const totalAmount = Math.max(0, subtotal + shippingFee - discount);

  // Apply Voucher
  const handleApplyVoucher = (e) => {
    e.preventDefault();
    if (voucherCode.trim().toUpperCase() === "DISCOUNT10") {
      setDiscount(subtotal * 0.1); // 10% discount
    } else {
      alert("Invalid Voucher Code! Try: DISCOUNT10");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-3xl">
          🛍️
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 mt-2 max-w-sm">
          Looks like you haven't added anything to your cart yet. Explore our latest items!
        </p>
        <Link
          to="/products"
          className="mt-6 bg-slate-900 text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-black transition-all shadow-lg"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-slate-900 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            Shopping Cart ({cart.length})
          </h1>
          <Link
            to="/products"
            className="text-xs font-bold text-slate-500 hover:text-slate-900 transition flex items-center gap-1"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT SECTION: CART ITEMS LIST ================= */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Top Bulk Action Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={cart.length > 0 && selectedItems.length === cart.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                />
                <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
                  SELECT ALL ({cart.length} ITEM(S))
                </span>
              </label>

              <button
                onClick={() => {
                  clearCart();
                  setSelectedItems([]);
                }}
                className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 transition"
              >
                <span>🗑️</span> DELETE ALL
              </button>
            </div>

            {/* Store / Seller Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    Official
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    Store.Lab Express Store
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Eligible for Free Shipping
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100">
                {cart.map((item) => {
                  const isSelected = selectedItems.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-colors ${
                        isSelected ? "bg-slate-50/40" : "bg-white"
                      }`}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectItem(item.id)}
                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer mt-1 sm:mt-0"
                      />

                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-xl p-2 shrink-0 border border-slate-200/60 flex items-center justify-center">
                        <img
                          src={item.thumbnail || item.images?.[0]}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-grow space-y-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                          {item.category || "General"}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-emerald-600 font-medium">
                          In Stock & Ready to Ship
                        </p>
                      </div>

                      {/* Price & Quantity Controls */}
                      <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {/* Price Display */}
                        <div className="text-left sm:text-right">
                          <p className="text-base font-black text-slate-900">
                            ${(item.price * (item.qty || 1)).toFixed(2)}
                          </p>
                          <p className="text-[10px] text-slate-400 line-through">
                            ${(item.price * 1.2).toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Counter & Actions */}
                        <div className="flex items-center gap-3">
                          {/* Item Quantity Incrementor */}
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <span className="px-3 py-1 text-xs font-black text-slate-700 bg-slate-50 border-r border-slate-200">
                              Qty: {item.qty || 1}
                            </span>
                          </div>

                          {/* Delete Action Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
                            title="Remove item"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SECTION: ORDER SUMMARY ================= */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-6">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">
                Order Summary
              </h2>

              {/* Subtotal Calculations */}
              <div className="space-y-3 text-xs font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal ({selectedItems.length} items)</span>
                  <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-slate-900">
                    {shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "$0.00"}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Voucher Discount</span>
                    <span className="font-bold">-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Voucher Code Form */}
              <form onSubmit={handleApplyVoucher} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Voucher Code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-slate-900 transition"
                />
                <button
                  type="submit"
                  className="bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-black transition shrink-0"
                >
                  APPLY
                </button>
              </form>

              {/* Total Price */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-black text-slate-900 uppercase">Total</span>
                <span className="text-2xl font-black text-slate-900">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                disabled={selectedItems.length === 0}
                onClick={() => navigate("/checkout")}
                className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all duration-300 ${
                  selectedItems.length > 0
                    ? "bg-slate-900 hover:bg-black text-white active:scale-98 shadow-slate-300"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                PROCEED TO CHECKOUT ({selectedItems.length})
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}