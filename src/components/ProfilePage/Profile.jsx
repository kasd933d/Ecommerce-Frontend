import React, { useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";


export default function Profile() {
  const { user, updateUserProfile } =useAuth();
  const [name, setName] = useState(user?.name || "");
  const [message, setMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(name);
    setMessage("Profile name updated locally!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-[85vh] bg-white text-black font-sans px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* PAGE HEADER */}
        <div className="border-b-2 border-black pb-6 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 block">
            Account Center
          </span>
          <h1 className="text-3xl font-black uppercase tracking-wider text-black">
            My Profile
          </h1>
        </div>

        {/* USER DISPLAY CARD */}
        <div className="border-2 border-black p-6 sm:p-8 bg-neutral-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center space-x-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black bg-black text-white flex items-center justify-center font-black text-2xl uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            {user?.name ? user.name.charAt(0) : "U"}
          </div>
          <div className="space-y-1 overflow-hidden">
            <h2 className="text-xl font-black uppercase tracking-wide truncate">
              {user?.name || "User"}
            </h2>
            <p className="text-xs font-bold text-neutral-600 truncate">{user?.email}</p>
            <span className="inline-block px-2.5 py-0.5 bg-black text-white text-[9px] font-black uppercase tracking-widest mt-2">
              Status: Verified Account
            </span>
          </div>
        </div>

        {/* DETAILS EDIT FORM */}
        <div className="border-2 border-black p-6 sm:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-black border-b border-neutral-200 pb-3">
            Account Settings
          </h3>

          {message && (
            <div className="p-3 text-xs font-bold uppercase border-2 border-green-600 bg-green-100 text-green-800">
              {message}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase tracking-widest text-black">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border-2 border-black text-sm font-medium focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-black uppercase tracking-widest text-black">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full p-3 border-2 border-neutral-300 bg-neutral-100 text-sm font-medium text-neutral-500 cursor-not-allowed"
              />
              <span className="text-[10px] text-neutral-400 font-bold block">
                Primary email address is read-only.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white hover:bg-neutral-800 text-xs font-black uppercase tracking-[0.2em] transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Update Details
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}