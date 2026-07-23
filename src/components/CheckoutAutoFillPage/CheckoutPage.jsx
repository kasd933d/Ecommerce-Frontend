import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city"; // Dynamic World Data

export default function DeliveryInformation({ formData, setFormData }) {
  // Countries list (All global countries)
  const countries = Country.getAllCountries();

  // States & Cities dynamic arrays
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Handle Country Selection -> Fetch Provinces/States
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const selectedCountryObj = countries.find((c) => c.isoCode === countryCode);

    setFormData((prev) => ({
      ...prev,
      country: selectedCountryObj ? selectedCountryObj.name : "",
      countryCode: countryCode,
      province: "",
      city: "",
      area: "",
    }));

    if (countryCode) {
      setStates(State.getStatesOfCountry(countryCode));
      setCities([]);
    } else {
      setStates([]);
      setCities([]);
    }
  };

  // Handle Province/State Selection -> Fetch Cities
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    const selectedStateObj = states.find((s) => s.isoCode === stateCode);

    setFormData((prev) => ({
      ...prev,
      province: selectedStateObj ? selectedStateObj.name : "",
      stateCode: stateCode,
      city: "",
      area: "",
    }));

    if (stateCode && formData.countryCode) {
      setCities(City.getCitiesOfState(formData.countryCode, stateCode));
    } else {
      setCities([]);
    }
  };

  // Standard input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
          1
        </span>
        <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
          Delivery Information
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="Enter your full name"
            value={formData.fullName || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="e.g. +92 300 1234567"
            value={formData.phone || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
          />
        </div>

        {/* Country (All Worldwide Countries) */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Country *
          </label>
          <select
            name="countryCode"
            required
            value={formData.countryCode || ""}
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

        {/* Building / House No / Floor / Street */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Building / House No / Floor / Street *
          </label>
          <input
            type="text"
            name="streetAddress"
            required
            placeholder="House # 123, Floor 2, Street 5"
            value={formData.streetAddress || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
          />
        </div>

        {/* Colony / Suburb / Locality / Landmark */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Colony / Suburb / Locality / Landmark
          </label>
          <input
            type="text"
            name="landmark"
            placeholder="Near Main Park / Opp. Shopping Mall"
            value={formData.landmark || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
          />
        </div>

        {/* Province / State */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Province / State *
          </label>
          <select
            name="province"
            required
            disabled={!states.length}
            value={formData.stateCode || ""}
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

        {/* City */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            City *
          </label>
          <select
            name="city"
            required
            disabled={!cities.length}
            value={formData.city || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition disabled:opacity-50"
          >
            <option value="">Please choose your city</option>
            {cities.map((c, index) => (
              <option key={index} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Area / Locality */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Area *
          </label>
          <input
            type="text"
            name="area"
            required
            placeholder="Please enter or choose your area (e.g. Block 4 / Sector G-11)"
            value={formData.area || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition"
          />
        </div>

        {/* Address Label (OFFICE / HOME Toggle) */}
        <div className="sm:col-span-2 pt-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Select a label for effective delivery:
          </label>

          <div className="flex items-center gap-3">
            {/* OFFICE Label Button */}
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, addressLabel: "OFFICE" }))}
              className={`flex-1 py-3 px-4 rounded-2xl border-2 text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                formData.addressLabel === "OFFICE"
                  ? "border-slate-900 bg-slate-900 text-white shadow-md"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
              }`}
            >
              🏢 OFFICE
            </button>

            {/* HOME Label Button */}
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, addressLabel: "HOME" }))}
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
  );
}