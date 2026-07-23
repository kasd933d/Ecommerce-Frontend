import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const { orderData, total, items } = location.state || {};

  if (!orderData) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-sm font-bold text-gray-500">No Order Found!</p>
        <Link to="/products" className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold">
          Go To Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16 px-4 max-w-xl mx-auto text-center font-sans">
      <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
        ✓
      </div>
      <h1 className="text-3xl font-black uppercase tracking-tight">Order Placed Successfully!</h1>
      <p className="text-gray-500 text-xs mt-2">Thank you for your purchase. We are preparing your order.</p>

      {/* Invoice Card */}
      <div className="mt-8 bg-gray-50 border border-black/10 rounded-3xl p-6 text-left space-y-4">
        <h3 className="font-black text-xs uppercase border-b pb-2 text-gray-400">Customer & Shipping Details</h3>
        <p className="text-sm font-bold">Name: <span className="font-normal">{orderData.name}</span></p>
        <p className="text-sm font-bold">Phone: <span className="font-normal">{orderData.phone}</span></p>
        <p className="text-sm font-bold">Address: <span className="font-normal">{orderData.address}</span></p>
        <p className="text-sm font-bold">Payment: <span className="font-normal">{orderData.paymentMethod}</span></p>

        <h3 className="font-black text-xs uppercase border-b pb-2 text-gray-400 pt-2">Purchased Items ({items?.length})</h3>
        <div className="space-y-2">
          {items?.map((item) => (
            <div key={item.id} className="flex justify-between text-xs font-bold">
              <span>{item.title} (x{item.qty})</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex justify-between font-black text-base">
          <span>Total Money Paid:</span>
          <span>${total?.toFixed(2)}</span>
        </div>
      </div>

      <Link
        to="/products"
        className="mt-8 inline-block w-full py-4 bg-black text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}