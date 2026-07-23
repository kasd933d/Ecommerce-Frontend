import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProductContext } from '../ProductContext';

function ProductDetail() {
  const { selectedProduct, addToCart } = useContext(ProductContext);
  const navigate = useNavigate();

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-sm font-bold text-gray-500">No product selected.</p>
        <Link to="/products" className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold">
          Back to Catalog
        </Link>
      </div>
    );
  }

  // FIXED: navigate('/cart') hata diya hai taake page redirect na ho
  const handleAddToCart = () => {
    addToCart(selectedProduct);
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <Link to="/products" className="text-xs font-black uppercase text-gray-400 hover:text-black mb-8 inline-block">
        ← Back To Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border border-black/10 p-8 rounded-3xl bg-gray-50">
        <div className="bg-white p-6 rounded-2xl border border-black/5 aspect-square flex items-center justify-center">
          <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="max-h-80 object-contain" />
        </div>

        <div className="space-y-6">
          <span className="text-xs font-black bg-black text-white px-3 py-1 rounded-full uppercase">
            {selectedProduct.category}
          </span>
          <h1 className="text-3xl font-black text-black uppercase">{selectedProduct.title}</h1>
          <p className="text-gray-600 text-sm leading-relaxed">{selectedProduct.description}</p>
          <div className="text-3xl font-black">${selectedProduct.price}</div>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-black text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 active:scale-95 transition"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;