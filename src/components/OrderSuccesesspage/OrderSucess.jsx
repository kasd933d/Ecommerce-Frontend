// import React, { useState } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";

// export default function OrderSuccessPage() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Extract data passed from CheckoutPage via React Router state
//   const { orderData, items, total } = location.state || {};

//   // Pure React way: Lazy state initialization (Fixes React 19 Impure Function Error)
//   const [orderId] = useState(
//     () => `AL-${Math.floor(100000 + Math.random() * 900000)}`
//   );

//   // Fallback if user navigates directly without placing an order
//   if (!orderData) {
//     return (
//       <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
//         <div className="bg-[#0a0a0a] border border-neutral-800 p-8 rounded-3xl max-w-md w-full space-y-6">
//           <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center mx-auto text-xl font-mono text-neutral-400">
//             !
//           </div>
//           <h2 className="text-xl font-black uppercase tracking-wider">
//             NO ORDER FOUND
//           </h2>
//           <p className="text-xs font-mono text-neutral-400 leading-relaxed">
//             It looks like you reached this page directly without completing checkout.
//           </p>
//           <Link
//             to="/"
//             className="inline-block w-full py-4 bg-white text-black font-mono font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-neutral-200 transition"
//           >
//             RETURN TO STORE
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden font-sans selection:bg-white selection:text-black">
//       {/* Background Ambient Glow */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

//       {/* Main Container */}
//       <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
//         {/* SUCCESS HEADER BADGE */}
//         <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mb-2">
//             <svg
//               className="w-8 h-8"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2.5"
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>

//           <div>
//             <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-400 font-bold block mb-1">
//               // TRANSACTION COMPLETE
//             </span>
//             <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
//               Order Confirmed!
//             </h1>
//           </div>

//           <p className="text-xs font-mono text-neutral-400 max-w-md mx-auto leading-relaxed">
//             Thank you for your order. We are processing your items and will dispatch them shortly.
//           </p>

//           <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
//             <span className="text-[10px] font-mono px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
//               ORDER ID: <span className="text-white font-bold">{orderId}</span>
//             </span>
//             <span className="text-[10px] font-mono px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//               STATUS: PAYMENT DONE
//             </span>
//           </div>
//         </div>

//         {/* ORDER DETAILS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
//           {/* CUSTOMER & SHIPPING INFO */}
//           <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
//             <div className="border-b border-neutral-800 pb-4">
//               <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white">
//                 01 / Shipping Details
//               </h3>
//             </div>

//             <div className="space-y-4 text-xs font-mono">
//               <div>
//                 <span className="text-neutral-500 text-[10px] uppercase block mb-1">
//                   Customer Name
//                 </span>
//                 <p className="font-bold text-white uppercase">{orderData.name}</p>
//               </div>

//               <div>
//                 <span className="text-neutral-500 text-[10px] uppercase block mb-1">
//                   Contact Phone
//                 </span>
//                 <p className="font-bold text-white">{orderData.phone}</p>
//               </div>

//               <div>
//                 <span className="text-neutral-500 text-[10px] uppercase block mb-1">
//                   Delivery Address
//                 </span>
//                 <p className="font-medium text-neutral-300 leading-relaxed uppercase">
//                   {orderData.address}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* PAYMENT METHOD & SUMMARY */}
//           <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
//             <div className="border-b border-neutral-800 pb-4">
//               <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white">
//                 02 / Payment Info
//               </h3>
//             </div>

//             <div className="space-y-4 text-xs font-mono">
//               <div>
//                 <span className="text-neutral-500 text-[10px] uppercase block mb-1">
//                   Payment Method
//                 </span>
//                 <div className="inline-flex items-center gap-2 px-3 py-2 bg-[#121212] border border-neutral-800 rounded-xl text-white font-bold">
//                   <span className="w-2 h-2 rounded-full bg-emerald-400" />
//                   {orderData.paymentMethod || "Cash on Delivery"}
//                 </div>
//               </div>

//               <div>
//                 <span className="text-neutral-500 text-[10px] uppercase block mb-1">
//                   Payment Status
//                 </span>
//                 <p className="font-black text-emerald-400 uppercase tracking-wider">
//                   SUCCESSFUL / CONFIRMED
//                 </p>
//               </div>

//               <div className="pt-2 border-t border-neutral-900 flex justify-between items-baseline">
//                 <span className="text-neutral-400 uppercase">Total Amount Paid:</span>
//                 <span className="text-xl font-black text-white font-mono">
//                   Rs. {total ? total.toLocaleString() : "0"}
//                 </span>
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* PURCHASED ITEMS SUMMARY */}
//         <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
//           <div className="border-b border-neutral-800 pb-4 flex justify-between items-center">
//             <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white">
//               03 / Order Items
//             </h3>
//             <span className="text-[10px] font-mono text-neutral-500">
//               [{items?.length || 0} ITEMS]
//             </span>
//           </div>

//           <div className="space-y-3">
//             {items && items.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#121212] border border-neutral-800/60"
//               >
//                 <div className="flex items-center gap-4 min-w-0">
//                   <img
//                     src={item.image || item.thumbnail}
//                     alt={item.title}
//                     className="w-12 h-12 object-contain bg-black border border-neutral-800 rounded-xl p-1 shrink-0"
//                   />
//                   <div className="min-w-0">
//                     <h4 className="text-xs font-bold uppercase text-white truncate">
//                       {item.title}
//                     </h4>
//                     <span className="text-[10px] font-mono text-neutral-500">
//                       QTY: {item.qty || 1}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="text-right shrink-0">
//                   <span className="text-xs font-mono font-bold text-white">
//                     Rs. {((item.price || 0) * (item.qty || 1)).toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ACTION BUTTON */}
//         <div className="text-center pt-4">
//           <button
//             onClick={() => navigate("/")}
//             className="w-full sm:w-auto px-10 py-5 bg-white hover:bg-neutral-200 text-black rounded-2xl text-xs font-mono font-black uppercase tracking-[0.25em] shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-[0.98] transition duration-200 cursor-pointer"
//           >
//             CONTINUE SHOPPING
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }