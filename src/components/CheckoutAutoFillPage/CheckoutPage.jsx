import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import { useProductContext } from "../ProductContext"; // Path check kar lein

export default function CheckoutPage() {
  const { cart, clearCart } = useProductContext?.() || {
    cart: [
      {
        id: 1,
        title: "Nature's Bounty Biotin 10,000 mcg - 120 Softgels",
        brand: "Nature's Bounty",
        image: "https://via.placeholder.com/100",
        price: 3515,
        originalPrice: 3995,
        discount: 12,
        qty: 1,
      },
    ],
    clearCart: () => {},
  };

  // Local Cart State (for working Quantity & Delete)
  const [cartItems, setCartItems] = useState(cart);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    countryCode: "PK",
    streetAddress: "",
    landmark: "",
    province: "",
    stateCode: "",
    city: "",
    area: "",
    address: "",
    addressLabel: "HOME",
  });

  // Dynamic World Dropdowns
  const countries = Country.getAllCountries();
  const [states, setStates] = useState(State.getStatesOfCountry("PK"));
  const [cities, setCities] = useState([]);

  // Country Change
  const handleCountryChange = (e) => {
    const code = e.target.value;
    setFormData((prev) => ({
      ...prev,
      countryCode: code,
      province: "",
      stateCode: "",
      city: "",
    }));
    setStates(code ? State.getStatesOfCountry(code) : []);
    setCities([]);
  };

  // Province/State Change
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    const selectedState = states.find((s) => s.isoCode === stateCode);
    setFormData((prev) => ({
      ...prev,
      province: selectedState ? selectedState.name : "",
      stateCode: stateCode,
      city: "",
    }));
    setCities(
      stateCode && formData.countryCode
        ? City.getCitiesOfState(formData.countryCode, stateCode)
        : []
    );
  };

  // General Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Cart Handlers
  const handleQtyChange = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Price Calculations
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );
  const deliveryFee = itemsTotal > 0 ? 145 : 0;
  const grandTotal = itemsTotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-slate-900 pt-24 pb-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-6">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT MAIN CONTAINER ================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. DELIVERY INFORMATION FORM */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
              <h2 className="text-base font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your first and last name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Country *
                  </label>
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleCountryChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
                  >
                    <option value="">Please choose your country</option>
                    {countries.map((c) => (
                      <option key={c.isoCode} value={c.isoCode}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Please enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
                  />
                </div>

                {/* Province / State */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Province *
                  </label>
                  <select
                    name="stateCode"
                    disabled={!states.length}
                    value={formData.stateCode}
                    onChange={handleStateChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition disabled:opacity-50"
                  >
                    <option value="">Please choose your province</option>
                    {states.map((s) => (
                      <option key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Building / House No */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Building / House No / Floor / Street *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder="Please enter"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    City *
                  </label>
                  <select
                    name="city"
                    disabled={!cities.length}
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition disabled:opacity-50"
                  >
                    <option value="">Please choose your city</option>
                    {cities.map((c, i) => (
                      <option key={i} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Colony / Suburb / Landmark */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Colony / Suburb / Locality / Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Please enter"
                    value={formData.landmark}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
                  />
                </div>

                {/* Area */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Area *
                  </label>
                  <input
                    type="text"
                    name="area"
                    placeholder="Please choose or type your area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
                  />
                </div>

                {/* Full Address */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="For Example: House# 123, Street# 123, ABC Road"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
                  />
                </div>

                {/* Office / Home Label Selection */}
                <div className="sm:col-span-2 pt-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Select a label for effective delivery:
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({ ...p, addressLabel: "OFFICE" }))
                      }
                      className={`flex-1 py-3 px-4 rounded-2xl border-2 text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                        formData.addressLabel === "OFFICE"
                          ? "border-slate-900 bg-slate-900 text-white shadow-md"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      🏢 OFFICE
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({ ...p, addressLabel: "HOME" }))
                      }
                      className={`flex-1 py-3 px-4 rounded-2xl border-2 text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                        formData.addressLabel === "HOME"
                          ? "border-slate-900 bg-slate-900 text-white shadow-md"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      🏠 HOME
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. CART ITEMS SECTION (PLACED DIRECTLY BELOW DELIVERY FORM) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
              <h2 className="text-base font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                Package Items ({cartItems.length})
              </h2>

              {cartItems.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60"
                    >
                      {/* Product Image & Title */}
                      <div className="flex items-center gap-4 min-w-0">
                        <img
                          src={item.image || item.thumbnail}
                          alt={item.title}
                          className="w-16 h-16 rounded-xl bg-white border border-slate-200 object-contain p-1 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            {item.brand || "Brand"}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-black text-slate-900">
                              Rs. {(item.price * (item.qty || 1)).toLocaleString()}
                            </span>
                            {item.originalPrice && (
                              <span className="text-[11px] text-slate-400 line-through">
                                Rs. {(item.originalPrice * (item.qty || 1)).toLocaleString()}
                              </span>
                            )}
                            {item.discount && (
                              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                -{item.discount}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                        <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              handleQtyChange(
                                item.id,
                                Math.max(1, (item.qty || 1) - 1)
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-xs font-black">
                            {item.qty || 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleQtyChange(item.id, (item.qty || 1) + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-rose-500 hover:text-rose-700 text-sm font-bold"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR: ORDER SUMMARY ================= */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
                  Order Summary
                </h2>
                <button className="text-xs font-bold text-slate-500 hover:text-slate-900">
                  Edit
                </button>
              </div>

              {/* Subtotal Calculations */}
              <div className="space-y-3 text-xs font-semibold text-slate-600">
                <div className="flex justify-between items-center">
                  <span>Items Total ({cartItems.length} items)</span>
                  <span className="font-bold text-slate-900">
                    Rs. {itemsTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-slate-900">
                    Rs. {deliveryFee}
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-black text-slate-900 block">
                      Total:
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      VAT included, where applicable
                    </span>
                  </div>
                  <span className="text-xl font-black text-slate-900">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={() => alert("Order Placed Successfully!")}
                disabled={cartItems.length === 0}
                className="w-full py-4 bg-slate-900 hover:bg-black disabled:opacity-50 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-98 transition duration-200"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}