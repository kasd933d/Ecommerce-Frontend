import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { useProductContext } from "../ProductContext";

export default function CheckoutPage() {
  const navigate = useNavigate();

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

  const [cartItems, setCartItems] = useState(cart);
  const [errorMessage, setErrorMessage] = useState("");

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

  const countries = Country.getAllCountries();
  const [states, setStates] = useState(() => State.getStatesOfCountry("PK"));
  const [cities, setCities] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );
  const deliveryFee = itemsTotal > 0 ? 145 : 0;
  const grandTotal = itemsTotal + deliveryFee;

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setErrorMessage("Full Name is required.");
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Phone Number is required.");
      return false;
    }
    if (!formData.address.trim() && !formData.streetAddress.trim()) {
      setErrorMessage("Complete Address is required.");
      return false;
    }
    if (cartItems.length === 0) {
      setErrorMessage("Your cart is empty.");
      return false;
    }
    return true;
  };

  // Directly process order without any payment selection or modal
  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    const fullAddressString = [
      formData.streetAddress,
      formData.address,
      formData.area,
      formData.city,
      formData.province,
    ]
      .filter(Boolean)
      .join(", ");

    const orderDetails = {
      name: formData.fullName,
      phone: formData.phone,
      address: fullAddressString,
    };

    const purchasedItems = [...cartItems];
    const finalTotal = grandTotal;

    if (clearCart) clearCart();
    setCartItems([]);

    navigate("/order-success", {
      state: {
        orderData: orderDetails,
        items: purchasedItems,
        total: finalTotal,
      },
    });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-3xl font-black uppercase tracking-tight text-white">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {/* Delivery Details Form */}
            <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-neutral-800 space-y-6">
              <h2 className="text-xs font-mono font-bold uppercase text-white">
                01 / Delivery Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="FULL NAME *"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="p-3 bg-[#121212] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-neutral-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="PHONE NUMBER *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="p-3 bg-[#121212] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-neutral-500"
                />

                {/* Country Selector */}
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleCountryChange}
                  className="p-3 bg-[#121212] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-neutral-500"
                >
                  <option value="">SELECT COUNTRY</option>
                  {countries.map((c) => (
                    <option key={c.isoCode} value={c.isoCode}>
                      {c.name}
                    </option>
                  ))}
                </select>

                {/* State / Province Selector */}
                <select
                  name="stateCode"
                  value={formData.stateCode}
                  onChange={handleStateChange}
                  disabled={!states.length}
                  className="p-3 bg-[#121212] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-neutral-500 disabled:opacity-40"
                >
                  <option value="">SELECT PROVINCE / STATE</option>
                  {states.map((s) => (
                    <option key={s.isoCode} value={s.isoCode}>
                      {s.name}
                    </option>
                  ))}
                </select>

                {/* City Selector */}
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!cities.length}
                  className="p-3 bg-[#121212] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-neutral-500 disabled:opacity-40"
                >
                  <option value="">SELECT CITY</option>
                  {cities.map((ct) => (
                    <option key={ct.name} value={ct.name}>
                      {ct.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="area"
                  placeholder="AREA / SECTOR (OPTIONAL)"
                  value={formData.area}
                  onChange={handleChange}
                  className="p-3 bg-[#121212] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-neutral-500"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="COMPLETE ADDRESS *"
                  value={formData.address}
                  onChange={handleChange}
                  className="sm:col-span-2 p-3 bg-[#121212] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-neutral-800 space-y-6">
              <h2 className="text-xs font-mono font-bold uppercase text-white">
                Order Summary
              </h2>

              <div className="text-xs font-mono space-y-2 text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white">
                    Rs. {itemsTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className="text-white">Rs. {deliveryFee}</span>
                </div>
                <div className="flex justify-between font-bold text-white text-lg pt-4 border-t border-neutral-800">
                  <span>Total:</span>
                  <span>Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {errorMessage && (
                <p className="text-[10px] font-mono text-red-400">
                  ⚠️ {errorMessage}
                </p>
              )}

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-white hover:bg-neutral-200 text-black rounded-xl font-mono text-xs font-black uppercase tracking-widest transition cursor-pointer"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}