// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// // Stripe Public Key (Apni real key se replace kar sakte hain)
// const stripePromise = loadStripe("pk_test_TYooMQiR57m4o00I0rt6vi6y");

// function CheckoutForm({ totalAmount, onSuccess, onClose }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);
//     setErrorMsg("");

//     const cardElement = elements.getElement(CardElement);

//     // Create Payment Method via Stripe API
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });

//     if (error) {
//       setErrorMsg(error.message);
//       setLoading(false);
//     } else {
//       setLoading(false);
//       // Successful Payment Action
//       onSuccess({
//         paymentMethodId: paymentMethod.id,
//         brand: paymentMethod.card.brand,
//         last4: paymentMethod.card.last4,
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="bg-[#121212] p-4 rounded-xl border border-neutral-800">
//         <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-3">
//           CARD DETAILS (VISA / MASTERCARD / AMEX)
//         </label>
//         <div className="p-3 bg-black border border-neutral-800 rounded-lg">
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "14px",
//                   color: "#ffffff",
//                   "::placeholder": { color: "#666666" },
//                   fontFamily: "monospace",
//                 },
//                 invalid: { color: "#ef4444" },
//               },
//             }}
//           />
//         </div>
//       </div>

//       {errorMsg && (
//         <p className="text-[10px] font-mono text-red-400 uppercase tracking-wider">
//           ⚠️ {errorMsg}
//         </p>
//       )}

//       <div className="flex gap-4">
//         <button
//           type="button"
//           onClick={onClose}
//           className="w-1/2 py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider"
//         >
//           CANCEL
//         </button>
//         <button
//           type="submit"
//           disabled={!stripe || loading}
//           className="w-1/2 py-4 bg-white hover:bg-neutral-200 text-black rounded-xl text-xs font-mono font-black uppercase tracking-wider disabled:opacity-30 flex items-center justify-center gap-2"
//         >
//           {loading ? (
//             <span className="animate-pulse">PROCESSING...</span>
//           ) : (
//             `PAY RS. ${totalAmount.toLocaleString()}`
//           )}
//         </button>
//       </div>
//     </form>
//   );
// }

// export default function PaymentModal({ isOpen, onClose, totalAmount, onSuccess }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
//       <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
//         <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
//           <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white">
//             // SECURE GATEWAY PAYMENT
//           </h3>
//           <button
//             onClick={onClose}
//             className="text-neutral-500 hover:text-white font-mono text-xs"
//           >
//             ✕
//           </button>
//         </div>

//         <Elements stripe={stripePromise}>
//           <CheckoutForm
//             totalAmount={totalAmount}
//             onSuccess={onSuccess}
//             onClose={onClose}
//           />
//         </Elements>
//       </div>
//     </div>
//   );
// }